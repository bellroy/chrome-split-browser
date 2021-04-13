# Chrome Split Browser

## What is this?

This repository contains a Chrome Extension that allows you to see and modify the Split experiment
variants that are running on the current website, assuming that it's a Ruby on Rails website that
uses [the Split gem](https://github.com/splitrb/split). This is useful for developers wanting to
verify the effect of being enrolled in specific variants of A/B tests.

Credit to the inimitable [@everlaat](https://github.com/everlaat) for building the first version of
this extension.

## How do I install it?

1. Clone this repository.
2. Open Chrome.
3. Click "Extensions" or "Manage Extensions" in the Chrome menu, or navigate to
   [chrome://extensions/](chrome://extensions/).
4. Ensure "Development Mode" is set to On.
5. Click "Load unpacked extension" and select the repository directory.
6. The extension should appear labelled "Split Experiment Browser". Ensure it is enabled.
7. Click the "Details" link in the "Split Experiment Browser" panel.
8. Change the "Site access" section to "On specific sites" and enter your website address.

## How do I use it?

When you browse to the specified site, you'll get console output showing all current experiments and
enrolled variants.

In the top right of the page you'll see a small box with a number in - the count of active
experiments. Click the box to change the variant to the one you want to appear to be enrolled in.
Note that you need to know the variant names in order to switch.
