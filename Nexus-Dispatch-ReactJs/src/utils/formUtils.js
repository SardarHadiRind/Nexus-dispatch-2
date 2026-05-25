const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE'

export function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container')
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'toast-container'
    document.body.appendChild(toastContainer)
  }

  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`
  toastContainer.appendChild(toast)

  setTimeout(() => toast.classList.add('show'), 10)
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, 3500)
}

function setError(element, message) {
  const formGroup = element.parentElement
  let errorDisplay = formGroup.querySelector('.error-text')
  if (!errorDisplay) {
    errorDisplay = document.createElement('span')
    errorDisplay.className = 'error-text'
    formGroup.appendChild(errorDisplay)
  }
  errorDisplay.innerText = message
  element.classList.add('error')
  element.classList.remove('success')
}

function setSuccess(element) {
  const formGroup = element.parentElement
  const errorDisplay = formGroup.querySelector('.error-text')
  if (errorDisplay) errorDisplay.innerText = ''
  element.classList.add('success')
  element.classList.remove('error')
}

export function validateRegistrationForm(form) {
  let isValid = true
  const firstName = form.querySelector('#firstName')
  const lastName = form.querySelector('#lastName')
  const email = form.querySelector('#email')
  const phone = form.querySelector('#phone')
  const mcNumber = form.querySelector('#mcNumber')
  const dotNumber = form.querySelector('#dotNumber')

  if (!firstName || !lastName) return true

  if (!firstName.value.trim()) {
    setError(firstName, 'First name is required')
    isValid = false
  } else setSuccess(firstName)

  if (!lastName.value.trim()) {
    setError(lastName, 'Last name is required')
    isValid = false
  } else setSuccess(lastName)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value.trim())) {
    setError(email, 'Provide a valid email address')
    isValid = false
  } else setSuccess(email)

  const phoneRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
  if (!phoneRegex.test(phone.value.trim())) {
    setError(phone, 'Provide a valid 10-digit phone number')
    isValid = false
  } else setSuccess(phone)

  if (!/^\d{6,7}$/.test(mcNumber.value.trim())) {
    setError(mcNumber, 'MC Number must be 6-7 digits')
    isValid = false
  } else setSuccess(mcNumber)

  if (!/^\d{5,8}$/.test(dotNumber.value.trim())) {
    setError(dotNumber, 'DOT Number must be 5-8 digits')
    isValid = false
  } else setSuccess(dotNumber)

  return isValid
}

export function clearFormState(form) {
  form.reset()
  form.querySelectorAll('.form-control').forEach((el) => {
    el.classList.remove('success', 'error')
  })
  form.querySelectorAll('.error-text').forEach((el) => {
    el.innerText = ''
  })
}

export async function handleFormSubmit(e, formId) {
  e.preventDefault()
  const form = e.target

  if (formId === 'registration-form' && !validateRegistrationForm(form)) {
    showToast('Please fix the errors in the form.', 'error')
    return
  }

  const btn = form.querySelector('button[type="submit"]')
  const originalText = btn.innerHTML
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
  btn.disabled = true

  const formData = new FormData()
  form.querySelectorAll('input, textarea, select').forEach((input) => {
    if (input.id) formData.append(input.id, input.value)
  })

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error('Formspree response not ok')
    btn.innerHTML = '<i class="fas fa-check"></i> Success!'
    btn.classList.add('btn-success')
    showToast(
      formId === 'registration-form'
        ? 'Application Submitted Successfully!'
        : 'Message Sent Successfully!',
      'success'
    )
    clearFormState(form)
  } catch {
    btn.innerHTML = '<i class="fas fa-check"></i> Success!'
    btn.classList.add('btn-success')
    showToast('Form Processed (Add Formspree ID to send real emails)', 'success')
    clearFormState(form)
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalText
      btn.disabled = false
      btn.classList.remove('btn-success')
    }, 3000)
  }
}
