---
myst:
  html_meta:
    "description": "ROCm release announcements and community discussions"
    "keywords": "ROCm, release, announcements, discussions, community"
---

# Release Announcements

This category is for announcements about ROCm releases. Stay up to date with the latest ROCm releases, discuss new features, and provide feedback to the development team.

## 2026 Release Schedule

### Transitioning to the New Build System "The Rock"

These are preview releases culminating with **ROCm 8.0**. ROCm 7.9 and above releases provide a packaging level break without breaking the API. 7.10 and above may include API breaks to prepare for ROCm 8.0.

```{note}
This deviates from the pure semantic version numbering scheme.
```

**Updated:** Dec 17, 2025 to take into account Thanksgiving Week. Product Management will refrain from scheduling work during a 1 week US Thanksgiving week, 2 weeks of the Winter holidays, and 1st week July. No other deviation from 6 week cycle is planned.

### Release Schedule Table

| Release Opportunity (RO) | Branch Date | Release Date | Milestones | AMDGPU Range | Comments |
|--------------------------|-------------|--------------|------------|--------------|----------|
| **7.11.0** | Jan 21, 2026 | Feb 11, 2026 | | 31.10.x | Branch date delayed for holidays until first working week in the new year |
| **8.0.0** (or 7.12) | Feb 26, 2026 (2026W9) | Mar 18, 2026 (2026W16) | First ROCm Release Recommended for Production based on New Build System. All packages are in either ROCm core, ROCm expansion packs (market verticals), or under a misc pack (standalone projects) | 31.10.x | Offline runfile installer |
| **RO W17** | Apr 2, 2026 (2026W14) | Apr 20, 2026 (2026W17) | Ubuntu 26.04 Day 0 (release package built with 8.1.0) | 31.20.x | Deviation from 6 week cycle, reduction of 1 week to align with Ubuntu 26.04 |
| **RO W23** | May 14, 2026 (2026W20) | Jun 4, 2026 (2026W23) | | 31.20.x | 6 week release cadence to be firmly established by this time |
| *Fourth of July Break* | 2026W27 | 2026W27 | | | |
| **RO W32** | July 15, 2026 (2026W29) | Aug 5, 2026 (2026W32) | | | |
| **RO W38** | Aug 26, 2026 (2026W35) | Sep 16, 2026 (2026W38) | | | |
| **RO W44** | Oct 7, 2026 (2026W41) | Oct 28, 2026 (2026W44) | | | |
| *Thanksgiving Break* | 2026W48 | 2026W48 | | | |
| **RO W2** | Nov 18, 2026 (2026W47) | Dec 16, 2026 (2026W51) | | | 5-week release window |
| *Winter Holiday Break* | 2026W51-W52 | 2026W51-W52 | | | |

```{important}
The proposed release schedule is based on a six-week cadence for ROCm X.Y major and minor releases. ROCm X.Y.Z, where Z represents the patch release, does not adhere to this schedule. Additionally, the six-week cadence is relaxed around holidays, particularly from December to January.
```

## Community Discussions

Join the conversation below to discuss ROCm releases, share your experiences, and connect with other ROCm users and developers.

```{raw} html
<script src="https://giscus.app/client.js"
        data-repo="faraaz-bot/ROCm"
        data-repo-id="R_kgDONhqJdg"
        data-category="Release Announcements"
        data-category-id="DIC_kwDONhqJds4Cl-Ks"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

## How to Participate

1. **Sign in with GitHub**: Click the "Sign in with GitHub" button in the discussion widget above
2. **Start or join a discussion**: Share your thoughts, ask questions, or respond to others
3. **React to posts**: Use emoji reactions to show support or agreement
4. **Stay updated**: Watch the repository to get notifications about new announcements

## Release Resources

For detailed release information, please refer to:

- [Release Notes](./release-notes.md) - Comprehensive release notes for each ROCm version
- [Compatibility Matrix](../compatibility/compatibility-matrix.rst) - Hardware and software compatibility information
- [What's New in ROCm](../what-is-rocm.rst) - Overview of ROCm features and capabilities
