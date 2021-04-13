chrome.extension.sendMessage(
  { action: 'ready' },
  ({ cookie, arrayExperiments }) => {
    logExperiments(arrayExperiments)
    renderPixel(cookie, arrayExperiments)
  }
)

function logExperiments (arrayExperiments) {
  console.group('Split')
  console.info('The following Split experiments are active:')
  console.table(arrayExperiments)
  console.groupEnd()
}

function renderPixel (cookie, arrayExperiments) {
  const $pixel = document.createElement('div')
  $pixel.setAttribute(
    'style',
    'position: fixed; top: 0; right: 0; width: auto; min-width: 13px; height: 13px; font-size: 11px; font-family: monospace; line-height: 13px; border: 1px solid #888; text-align: center; color: #888; cursor: pointer; z-index: 9999999;'
  )
  $pixel.innerHTML = `${arrayExperiments.length}`
  document.body.appendChild($pixel)
  $pixel.addEventListener('click', () =>
    showExperimentsTable(cookie, arrayExperiments)
  )
}

function showExperimentsTable (cookie, arrayExperiments) {
  const $modal = document.createElement('div')
  $modal.setAttribute(
    'style',
    'position: fixed; top: 5px; right: 5px; z-index: 999999999; background: #ddd; color: #333; width: auto; max-width: 70vh; min-width: 440px; min-height: 100px; padding: 20px; font-family: monospace;'
  )
  const $form = document.createElement('form')

  const $table = document.createElement('table')
  const $tableHead = document.createElement('thead')
  $tableHead.innerHTML = '<tr><th>Experiment Name</th><th>Variant</th></tr>'
  $table.appendChild($tableHead)
  const $tableBody = document.createElement('tbody')
  $table.appendChild($tableBody)

  for (var i = 0; i < arrayExperiments.length; i += 1) {
    const $row = document.createElement('tr')

    const $name = document.createElement('td')
    $name.innerHTML = arrayExperiments[i].name

    const $variant = document.createElement('td')
    const $variantInput = document.createElement('input')
    $variantInput.name = arrayExperiments[i].name
    $variantInput.value = arrayExperiments[i].variant
    $variantInput.setAttribute(
      'style',
      'font-size: 13px; font-family: monospace; background: #ddd; border: 1px solid #888; color: #333; padding: 3px; width: 230px; margin: 3px 0 0 10px;'
    )
    $variant.appendChild($variantInput)

    $row.appendChild($name)
    $row.appendChild($variant)

    $tableBody.appendChild($row)
  }

  $form.appendChild($table)

  const $save = document.createElement('button')
  $save.type = 'submit'
  $save.innerHTML = 'Save'

  $form.appendChild($save)

  $form.addEventListener('submit', event => {
    event.preventDefault()
    const newExperimentsObj = {}

    for (var i = 0; i < arrayExperiments.length; i += 1) {
      const value = $form.querySelector(`[name="${arrayExperiments[i].name}"]`)
        .value
      if (value !== '') {
        newExperimentsObj[arrayExperiments[i].name] = value
      }
    }

    cookie.value = encodeURIComponent(JSON.stringify(newExperimentsObj))

    chrome.extension.sendMessage({ action: 'save', cookie }, () => {
      window.location.reload()
    })
  })

  $modal.appendChild($form)
  document.body.appendChild($modal)
}
