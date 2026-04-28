# Cache Cleaner

Project - This is a Web Extension for Chrome and Firefox using the WXT Framework, TypeScript, and Vue3.
The documentation uses VitePress.

Application - The primary purpose is to allow the user to clear site or browser cache.
The user can select which items are cleared when clearing the cache, or clear everything.

## Terminology

### Cache Items

Selected (items) - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browsingData/DataTypeSet
Selected Site - Site specific, user selected items
All Site - All site items, regardless of selections
Selected Browser - Browser + All Site, use selected items
All Browser - All browser + All Site, regardless of selections

### Other

Popout - Extension Panel

## Application Overview

There are 4 primary options to clear cache:

- Clear **Selected** Site Cache
- Clear All Site Cache
- Clear **Selected** Browser and All Site Cache
- Clear All Browser and All Site Cache

## Application Structure

The extension allows users to interface via the following APIs.

- Toolbar Popup - All cache options (accessed with Toggle UI)
- Keyboard Shortcuts - All cache options + Toggle UI
- Right-Click Context Menu - All cache options + Toggle UI
- Side Panel UI - Browser + All Site cache only + Toggle UI
- Popout - Browser + All Site cache only

## Project Structure

- `src` - Source directory for the web extension, WXT Framework.
- `docs` - Source directory for the documentation, VitePress framework.
