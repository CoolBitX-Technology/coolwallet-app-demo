## fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios match_all

```sh
[bundle exec] fastlane ios match_all
```

下載所有需要的證書和描述檔到本地，不會重新創建證書和描述檔

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Get certificates

### ios deploy

```sh
[bundle exec] fastlane ios deploy_demo_app
```

Deploy to TestFlight

### ios slack_deployed_message_for_staging_app

```sh
[bundle exec] fastlane ios slack_deployed_message_for_demo_app
```

Slack deployed message for demo App

### ios print_build_number

```sh
[bundle exec] fastlane ios print_build_number
```

---

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
