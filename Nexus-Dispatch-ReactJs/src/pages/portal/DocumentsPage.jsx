import { useState } from 'react'
import { useAppData } from '../../context/AppDataContext'
import SignaturePad from '../../components/portal/SignaturePad'

const STATUS_OPTIONS = ['draft', 'in_review', 'signed']

export default function DocumentsPage() {
  const { documents, addDocument, updateDocument } = useAppData()
  const [selected, setSelected] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const id = addDocument({
      name: file.name,
      fileUrl: url,
      mimeType: file.type,
    })
    setSelected(id)
    setPreviewUrl(url)
    e.target.value = ''
  }

  const selectDoc = (doc) => {
    setSelected(doc.id)
    setPreviewUrl(doc.fileUrl || null)
  }

  const handleSignature = (signatureData) => {
    if (!selected) return
    updateDocument(selected, { signatureData, status: 'signed' })
  }

  const changeStatus = (status) => {
    if (!selected) return
    updateDocument(selected, { status })
  }

  const activeDoc = documents.find((d) => d.id === selected)

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <div>
          <h1>Document Chamber</h1>
          <p>Upload contracts, preview documents, and apply e-signatures.</p>
        </div>
        <label className="btn btn-primary upload-btn">
          <i className="fas fa-upload"></i> Upload Document
          <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleUpload} hidden />
        </label>
      </div>

      <div className="documents-layout">
        <section className="portal-card doc-list-panel">
          <h2><i className="fas fa-folder-open"></i> Documents</h2>
          <ul className="doc-list">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className={selected === doc.id ? 'active' : ''}
                onClick={() => selectDoc(doc)}
                onKeyDown={(e) => e.key === 'Enter' && selectDoc(doc)}
                role="button"
                tabIndex={0}
              >
                <i className="fas fa-file-pdf"></i>
                <div>
                  <strong>{doc.name}</strong>
                  <span className={`badge badge-${doc.status === 'signed' ? 'success' : doc.status === 'in_review' ? 'info' : 'muted'}`}>
                    {doc.status.replace('_', ' ')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="portal-card doc-preview-panel">
          {activeDoc ? (
            <>
              <div className="doc-preview-header">
                <h2>{activeDoc.name}</h2>
                <div className="status-select">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`status-chip${activeDoc.status === s ? ' active' : ''}`}
                      onClick={() => changeStatus(s)}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="doc-preview-area">
                {previewUrl || activeDoc.fileUrl ? (
                  activeDoc.mimeType?.startsWith('image/') ? (
                    <img src={previewUrl || activeDoc.fileUrl} alt={activeDoc.name} />
                  ) : (
                    <iframe
                      title={activeDoc.name}
                      src={previewUrl || activeDoc.fileUrl}
                      className="doc-iframe"
                    />
                  )
                ) : (
                  <div className="doc-preview-placeholder">
                    <i className="fas fa-file-contract"></i>
                    <p>Preview available after upload. Sample contract shown below.</p>
                    <div className="mock-contract">
                      <h3>DISPATCH PARTNERSHIP AGREEMENT</h3>
                      <p>This agreement is entered between Nexus Dispatch LLC and the carrier...</p>
                      <p>Terms: 5% gross load commission · 24/7 dispatch support · No forced dispatch.</p>
                    </div>
                  </div>
                )}
              </div>

              {activeDoc.signatureData && (
                <div className="applied-signature">
                  <p>Applied Signature:</p>
                  <img src={activeDoc.signatureData} alt="Signature" />
                </div>
              )}

              <div className="signature-section">
                <h3><i className="fas fa-signature"></i> E-Signature</h3>
                <SignaturePad onSave={handleSignature} />
              </div>
            </>
          ) : (
            <div className="empty-state large">
              <i className="fas fa-file-upload"></i>
              <p>Select or upload a document to begin.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
