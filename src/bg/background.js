const actions = {
  ready: onReady,
  save: onSave
}

function onReady (request, sender, callback) {
  chrome.cookies.get({ name: 'split', url: sender.url }, cookie => {
    if (cookie) {
      const experiments = JSON.parse(decodeURIComponent(cookie.value))
      const arrayExperiments = []

      for (var name in experiments) {
        arrayExperiments.push({ name, variant: experiments[name] })
      }

      // chrome.notifications.create(null, { type: "basic", title: "Split Experiment", message: `found ${arrayExperiments.length} active experiments on ${sender.url}`, iconUrl: "./icons/icon48.png"})

      callback({ cookie, arrayExperiments })
    }
  })
}

function onSave (request, sender, callback) {
  chrome.cookies.set(
    {
      url: sender.url,
      name: request.cookie.name,
      value: request.cookie.value,
      path: request.cookie.path,
      expirationDate: request.cookie.expirationDate,
      secure: true,
      sameSite: 'lax',
      httpOnly: true
    },
    callback
  )
}

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (typeof actions[request.action] !== 'undefined') {
    actions[request.action](request, sender, sendResponse)
  }

  return true
})
