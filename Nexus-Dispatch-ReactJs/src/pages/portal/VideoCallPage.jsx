import { useRef, useState, useEffect } from 'react'

export default function VideoCallPage() {
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const streamRef = useRef(null)
  const screenRef = useRef(null)

  const [inCall, setInCall] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [screenSharing, setScreenSharing] = useState(false)
  const [hasStream, setHasStream] = useState(false)
  const [error, setError] = useState('')

  const stopAllStreams = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (screenRef.current) {
      screenRef.current.getTracks().forEach((t) => t.stop())
      screenRef.current = null
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
    setHasStream(false)
  }

  const startCall = async () => {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream
      if (localVideoRef.current) localVideoRef.current.srcObject = stream
      setHasStream(true)
      setInCall(true)
      setVideoEnabled(true)
      setAudioEnabled(true)
    } catch {
      setError('Camera/mic access denied. Showing mock UI — grant permissions to use WebRTC.')
      setInCall(true)
    }
  }

  const endCall = () => {
    stopAllStreams()
    setInCall(false)
    setScreenSharing(false)
  }

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((t) => {
        t.enabled = !videoEnabled
      })
    }
    setVideoEnabled((v) => !v)
  }

  const toggleAudio = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((t) => {
        t.enabled = !audioEnabled
      })
    }
    setAudioEnabled((a) => !a)
  }

  const toggleScreenShare = async () => {
    if (screenSharing) {
      if (screenRef.current) {
        screenRef.current.getTracks().forEach((t) => t.stop())
        screenRef.current = null
      }
      if (streamRef.current && localVideoRef.current) {
        localVideoRef.current.srcObject = streamRef.current
      }
      setScreenSharing(false)
      return
    }
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({ video: true })
      screenRef.current = screen
      if (localVideoRef.current) localVideoRef.current.srcObject = screen
      screen.getVideoTracks()[0].onended = () => toggleScreenShare()
      setScreenSharing(true)
    } catch {
      setError('Screen share cancelled or not supported.')
    }
  }

  useEffect(() => () => stopAllStreams(), [])

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <div>
          <h1>Video Calling</h1>
          <p>WebRTC-powered meeting room (frontend mock with real camera when permitted).</p>
        </div>
        <span className={`call-status ${inCall ? 'live' : ''}`}>
          {inCall ? '● In Call' : '○ Idle'}
        </span>
      </div>

      {error && <div className="portal-alert">{error}</div>}

      <div className="video-room">
        <div className="video-grid">
          <div className="video-tile local">
            <video ref={localVideoRef} autoPlay playsInline muted className="video-feed" />
            {(!inCall || !hasStream) && (
              <div className="video-placeholder">
                <i className="fas fa-user"></i>
                <span>You</span>
              </div>
            )}
            {inCall && !videoEnabled && (
              <div className="video-off-overlay">
                <i className="fas fa-video-slash"></i>
              </div>
            )}
            <span className="video-label">You {screenSharing && '(Screen)'}</span>
          </div>

          <div className="video-tile remote">
            <video ref={remoteVideoRef} autoPlay playsInline className="video-feed" />
            <div className="video-placeholder remote-mock">
              <i className="fas fa-user-tie"></i>
              <span>{inCall ? 'Remote Participant (Mock)' : 'Waiting...'}</span>
            </div>
            <span className="video-label">Partner</span>
          </div>
        </div>

        <div className="video-controls">
          {!inCall ? (
            <button type="button" className="btn btn-primary video-btn-start" onClick={startCall}>
              <i className="fas fa-phone"></i> Start Call
            </button>
          ) : (
            <>
              <button
                type="button"
                className={`vc-btn${videoEnabled ? '' : ' off'}`}
                onClick={toggleVideo}
                title="Toggle video"
              >
                <i className={`fas ${videoEnabled ? 'fa-video' : 'fa-video-slash'}`}></i>
              </button>
              <button
                type="button"
                className={`vc-btn${audioEnabled ? '' : ' off'}`}
                onClick={toggleAudio}
                title="Toggle audio"
              >
                <i className={`fas ${audioEnabled ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
              </button>
              <button
                type="button"
                className={`vc-btn${screenSharing ? ' active' : ''}`}
                onClick={toggleScreenShare}
                title="Share screen"
              >
                <i className="fas fa-desktop"></i>
              </button>
              <button type="button" className="vc-btn end" onClick={endCall} title="End call">
                <i className="fas fa-phone-slash"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
