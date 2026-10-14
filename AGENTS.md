<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the public experience in TanStack file routes with a shared SiteLayout and CSS design tokens, so navigation and branding stay consistent.
- Source the job catalogue from the supplied document in src/data/jobs.json; retain missing values rather than inventing recruitment details.
- Share selected job IDs through a session-only React provider; do not imply account storage or online application submission.

- Render company logos through the shared CompanyLogo component and a document-independent asset mapping; use official downloaded logos stored on Lovable Assets and initials when no verified logo is available, so employer identity stays consistent without inventing artwork.
