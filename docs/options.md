---
outline: [2, 3]
---

# Options

The options let you control how the extension functions, looks and feels.

- [Cache Options](#cache-options)
- [Extension Options](#extension-options)
- [Keyboard Shortcuts](#keyboard-shortcuts)

<div class="warning custom-block" style="padding-top: 8px;">

:robot: Most of the documentation on this page is AI generated!

</div>

## Cache Options

Control which data types are cleared when you run a site or browser cache operation. These selections determine what counts as a **Selected** clear — the counterpart to an **All** clear, which always removes every available type regardless of these settings.

Changes apply immediately to all future clear operations.

### Site Specific Settings

These options apply when clearing the cache for the **current site only**. They affect the _Clear Selected Site Cache_ action.

| Option              | Description                                                                                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cookies**         | Session tokens, login state, preferences, and any other key-value data stored by the site in your browser. Clearing cookies will sign you out of most sites.                                                   |
| **Index DB**        | IndexedDB storage used by the site to persist structured data locally — commonly used by web apps for offline support or large local datasets.                                                                 |
| **Local Storage**   | Persistent key-value data stored by the site via the Web Storage API. Unlike cookies, this is never sent to the server but is retained across sessions until explicitly cleared.                               |
| **Service Workers** | Scripts that run in the background and can intercept network requests, enable offline functionality, and power push notifications. Clearing these forces the site to re-register its worker on the next visit. |
| **Cache Storage**   | Resources cached by the site's service worker (e.g., HTML, CSS, JS, images) for faster loads and offline use. Clearing this removes those stored assets and the browser will re-fetch them from the network.   |

### Global Browser Settings

These options apply when clearing cache **across all sites**. They are split into two groups: data stored per-site, and data belonging to the browser itself.

#### All Sites

These types are scoped to individual sites but cleared globally — across every domain — when performing a browser-wide cache clear.

| Option              | Description                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Cookies**         | Cookies from all sites. Clearing this will sign you out of every site you're currently logged into.            |
| **Index DB**        | IndexedDB databases across all sites.                                                                          |
| **Local Storage**   | Local Storage data from all sites.                                                                             |
| **Service Workers** | Service workers registered across all sites. Each affected site will re-register its worker on the next visit. |

#### Browser

These types belong to the browser itself rather than individual sites.

| Option            | Description                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Browser Cache** | The browser's HTTP cache — the stored copies of web resources (HTML, CSS, JS, images, fonts) used to speed up page loads. Clearing this will cause sites to fully reload all assets from the network on the next visit. |
| **Downloads**     | The browser's record of downloaded files. This removes the entries from your download history but does **not** delete the actual files from your disk.                                                                  |
| **Form Data**     | Autofill suggestions saved by the browser from previously submitted forms, such as names, addresses, and search terms.                                                                                                  |
| **History**       | Your browsing history — the list of URLs and page titles the browser has recorded.                                                                                                                                      |
| **Passwords**     | Saved login credentials stored in the browser's built-in password manager. _(Deprecated)_                                                                                                                               |
| **Plugin Data**   | Data stored by browser plugins such as Flash. _(Deprecated — most browsers have removed plugin support.)_                                                                                                               |

## Extension Options

General extension behaviour settings, including UI preferences and confirmation dialogs for each cache action.

#### Auto Reload Site

Automatically reloads the current tab after a site cache clear completes. This ensures the page immediately reflects the cleared state — particularly useful when clearing cookies or service workers, where a manual refresh would otherwise be required to see the effect.

Does not apply to browser-wide clear operations.

#### Show All Buttons

By default, the popup shows either site or browser cache controls depending on context. Enabling this option forces both the **Site Cache** and **Browser Cache** sections to appear in the popup at the same time, giving you quick access to all clear actions from a single view.

#### Default to Browser

When the popup opens, it defaults to the **Site Cache** tab. Enable this option to make it open to the **Browser Cache** tab instead. Useful if you clear browser cache more frequently than site cache.

#### Show Confirmation

Display a confirmation prompt before executing a cache clear. This adds a safety step to prevent accidental clears. Confirmations can be enabled or disabled independently for each cache action type:

| Action                | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| **Site Cache**        | Prompt before clearing the selected site cache.                 |
| **All Site Cache**    | Prompt before clearing all data types for the current site.     |
| **Browser Cache**     | Prompt before clearing the selected browser cache.              |
| **All Browser Cache** | Prompt before clearing all browser data types across all sites. |

:::warning
This does **NOT** work when using the [Context Menu](usage.md#context-menu) or [Keyboard Shortcuts](usage.md#keyboard-shortcuts).
:::

#### Show Context Menu

Adds a **Cache Cleaner** submenu to the browser's right-click context menu, letting you trigger cache actions from any page without opening the popup. Disable this to remove the submenu entirely if you prefer a cleaner context menu.

When enabled, the following items can appear in the context menu:

| Item                        | Description                                                      |
| --------------------------- | ---------------------------------------------------------------- |
| **Clear Site Cache**        | Clears the selected data types for the current site.             |
| **Clear All Site Cache**    | Clears all data types for the current site, ignoring selections. |
| **Clear Browser Cache**     | Clears the selected data types across the whole browser.         |
| **Clear All Browser Cache** | Clears all browser data types, ignoring selections.              |
| **Open Popup**              | Opens the extension popup panel.                                 |
| **Open Side Panel**         | Opens the extension side panel.                                  |
| **Open Options**            | Opens this options page.                                         |

> **Note:** Individual context menu items can be shown or hidden independently using the checkboxes above. Disabling **Show Context Menu** removes all items at once.

#### Show All Items on Toolbar Icon

When you right-click the extension's toolbar icon, by default only a minimal set of actions are shown. Enabling this option adds all available context menu actions to the toolbar icon's right-click menu, matching the full set available in the page context menu.

#### Show Error Notifications

Shows a browser notification if a cache clear operation triggered by a **keyboard shortcut** or **right-click context menu** encounters an error. Errors that occur through the popup UI are always shown inline regardless of this setting.

Disable this if you find error notifications disruptive and prefer to check results manually.

#### Show Deprecated Options

Some cache types are deprecated — they were part of older browser APIs that are no longer actively used (such as App Cache, Web SQL, and File Systems). These options are hidden by default to keep the interface clean.

Enable this to show deprecated cache types in the Site and Browser settings, in case you need to clear legacy data from older web applications.

#### Show Release Notes on Update

Automatically opens the Release Notes page when the extension is updated to a new version. This keeps you informed of new features, bug fixes, and any changes to how cache clearing behaves.

Disable this if you prefer to check for updates manually.

#### Options Page Background

The Options page can be set to an Image URL, Video URL or None.

## Keyboard Shortcuts

Manage the keyboard shortcuts used to trigger cache-clearing actions and open extension panels directly from the browser, without needing to open any UI.

Shortcuts can be customized through your browser's built-in extension shortcut manager. Click **Manage Keyboard Shortcuts** to open it.

| Description             | Shortcut                                     |
| ----------------------- | -------------------------------------------- |
| Clear Site Cache        | <kbd>F4</kbd>                                |
| Clear All Site Cache    | <kbd>F6</kbd>                                |
| Clear Browser Cache     | Not Set                                      |
| Clear All Browser Cache | Not Set                                      |
| Open Popup              | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> |
| Open Side Panel         | Not Set                                      |
| Open Extension Panel    | Not Set                                      |
| Open Options            | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> |

Note: Shortcuts marked _Not Set_ can be assigned in your browser's extension shortcut settings. In Chrome, visit `chrome://extensions/shortcuts`. In Firefox, visit `about:addons` and click the gear icon.

<div class="info custom-block" style="padding-top: 8px; margin-top: 64px;">

:bulb: If you need help using the extension, [support](support.md) is available...

</div>
