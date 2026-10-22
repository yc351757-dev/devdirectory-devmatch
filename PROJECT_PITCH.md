# DevMatch - One-minute project pitch

## Problem
College teams often start projects without knowing which technical roles they need. A plain developer directory can show people's names and skills, but it does not help a student understand whether the team can cover the project requirements.

## Solution
DevMatch lets a student describe a project in normal language. The app extracts technical skills from the description, compares them with developer profiles, ranks a shortlist, explains the matched skills, and reports skills that the selected team does not cover.

## What makes it different
- It solves a concrete team-formation problem instead of adding a generic chatbot.
- It produces explainable recommendations: a reviewer can see which skills caused a profile to rank well.
- It identifies team-level skill gaps, not only individual matches.
- It works as a frontend demo without a paid AI API or secret key.

## Technical method
The current demo uses a small synonym dictionary and a deterministic scoring heuristic over sample developer profiles. The top three profiles are combined to calculate team-level skill coverage. This is transparent and easy to explain in a viva. It is not a trained AI model, and scores should be treated as suggestions rather than guarantees.

## Core modules
1. Developer directory with search and filters.
2. Developer profiles and sample technical posts.
3. Project brief analyzer and skill extraction.
4. Developer ranking with match explanations.
5. Team skill-gap and coverage summary.
6. Mock login, protected post form, validation, and Axios API layer.

## Demo flow for the instructor
1. Open `/match`.
2. Keep the default college attendance dashboard brief or try the Data project starter.
3. Click **Analyze project & find teammates**.
4. Show the extracted skill chips, team skill coverage, and any detected gap.
5. Scroll to the recommended shortlist and explain matched skills on each person.
6. Open `/users` to demonstrate search, role filtering, and profile pages.
7. Open `/add-post` while logged out, sign in with the demo form, and show the protected route and validated form.

## Important honesty note
The public JSONPlaceholder endpoint is a mock API and does not permanently store created posts. The current matching engine is deterministic keyword-based logic, not a connected LLM. Both can be extended in a later version.
