---
title: Open Hosts Editor is now officially released!
date: 2020-12-08 14:35 +0000
project: Open Hosts Editor
---

Over three years after its first commit in 22 Jul 2017, Open Hosts Editor has finally been officially released on Google Play!

## Story time! ✨

### Why?

As a tinkerer, I needed a quick way of editing my `/etc/hosts` file on Android, and I didn't really trust installing a random root app for security reasons, so I thought "How hard can it be anyways? Just make an app that reads/writes the `/etc/hosts` file".

### What???

For those unfamiliar with the hosts file, this file placed under `/etc/hosts` on Linux devices and in `%windir%\system32\drivers\etc\hosts` on Windows, and it allows to map an URL to an IP address, bypassing the DNS. It is useful if you want to make a custom domain name used in your local network, or blocking a website by making it point to `0.0.0.0`, which is a non-routable meta-address (i.e. it won't go anywhere).

### How?

It turns out that it was a bit more complicated than that, as the system partition is mounted in readonly mode, so it needs
to:

1. Remounted in write mode first.
2. Write the file on a temp folder.
3. Then copy the temp file over in `/etc/hosts` using the command line, because Android doesn't offer any APIs to access files outside the storage (or the app sandbox).
4. Mount the system partition in read-only mode.

Despite the problem not having a naturally clean solution, it wasn't very hard to achieve, and most of Open Hosts Editor was written in one afternoon. All the following changes were more UI-related than core-logic related.

I published the app on the Play Store, and it sat there for a few years, when I realized that it had reached over 100,000 install
worldwide, despite being marked as "early access". Honestly, people, what do you even need it for?

### When (did I ask you)?

The greatest joy was when [phrogg](https://github.com/phrogg) opened a [PR](https://github.com/SirPryderi/open-hosts-editor/pull/1), making it the first PR on Open Hosts Editor, and the first PR I ever received on an open source project. I hope more will come in the future! His contribution sparkled my interested for the project again, and decided to setup the CI using Triple-T's [`gradle-play-publisher`](https://github.com/Triple-T/gradle-play-publisher), which allows to easy publish your app to google play from command line, and makes CI/CD extremely easy for Android apps. All of that, after having to contact Google because I lost the keystore file I initially used to sign the app, fortunately Google Play allows to submit a new private key once if you lost it for some reason.

## Back to the present

Now (Dec 2020), I finally decided to take Open Host Editor out of early access, and as an inauguration gift I opened [Discord server](https://discord.gg/ddv7VRY2vh) for everyone to discuss issues, support and suggestions. You can find the app on the [Play Store](https://play.google.com/store/apps/details?id=me.vittorio_io.openhostseditor).

## The end

This concludes our brief history of the app, but I'm sure that many more chapters will come in the future. Stay tuned!
