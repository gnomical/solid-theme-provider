# Additional Instructions for AGENTS

# Common Issues
- Do not instantiate more than one `ThemeProvider`. Because this library injects css variables into the root css node, it is undesirable to use more than one provider in an app. Just wrap the app in a single provider and then use the context or render ui components anywhere within the app. 