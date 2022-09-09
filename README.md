# Ability Plus

Ability Plus is a project proposal management tool that not only provides an efficient way for companies to create project requests, gather students’ project ideas and organize their project proposals to reach potential employees but also assists students to effectively deliver their thoughts to companies, enriching their project experience.


## Table of Contents

- [Author](#author)
- [Live Demo](#live-demo)
- [Features](#features)
- [System Architecture](#system-architecture]
- [Local Deployment](#local-deployment)
- [Backend](#backend)
- [File Structure](#file-structure)
- [Technical Support or Questions](#technical-support-or-questions)


## Author

The frontend of Ability Plus is developed by three of the glhf's group members:

1. Ella Song (z5261532)
2. Dingheng Li (z5291137)  
3. Katrina (Ziqi) Ding (z5211336)

## Live Demo

[Live Demo here](http://ability-plus.site/)

## Features

### Definition

#### Users

| Role    | Definition                                        |
| ------- | ------------------------------------------------------------ |
| **Company** | The organizations that can publish their industry challenges on Ability Plus and welcome student to submit proposals. |
| **Student** | The student users that can submit project proposals to the challenges that they would like to solve. |





#### Status of Industry Challenges
| Status            | Definition                                        |
| ----------------- | ------------------------------------------------------------ |
| **Draft**             | The challenge hasn't been published.                          |
| **Open for proposal** | The industry challenge is accepting proposal submission.     |
| **Approving**         | After the proposal submission deadline passed, company can select outstanding proposals. After company selects outstanding proposals, the status will be changed to "Open for Solution". |
| **Open for Solution** | Some of the proposals are selected as outstanding by companies. At this stage, the proposal author can submit their complete solution. |
| **Closed**     | The deadline of the solution is passed.                      |



#### Status of Proposals

| Status        | Definition                                        |
| ------------- | ------------------------------------------------------------ |
| **Draft**     | The proposal hasn't been submitted.                          |
| **Submitted** | The proposal has been submitted to a opening challenge.      |
| **Approving** | The challenge owner (the company user) is selecting the outstanding proposals. |
| **Approved**  | The proposal is selected as outstanding by companies. The student author can submit a complete solution. |
| **Rejected**  | The proposasl is not selected as outstanding proposal.       |



### For Company User

1. Company can contact ability.test.official@outlook.com and provide legal documents to register a company account on Ability Plus.
2. Company can browse project challenges created by other companies, learn from them and improve own project challenge documents.
3. Company can create project challenges and make them visible to students after filling the requirements(including title, category, proposal deadline, solution deadline, description, project requirements and rewards).
4. Company can preview the project challenge they will publish after filling the requirements.
5. Company can save incomplete project challenges to draft, edit them later or deleted from draft when no longer needed.
6. Company can view other companies' profile and their project challenges.
7. Company can view own project challenges in different status(all, draft, open for proposal, approving, open for solution, closed), sort by create time and search by keyword.
8. Company can edit own profile including company name, contact email and description that enables students to reach to them easier.
9. Company can change their password in the personal profile to keep their account secure at all times.
10. Company can view students' profile if one of the proposals of the student is listed as outstanding and company can contact student by email.
11. Company can create/edit/delete own posts in own project challenge forums.
12. Company can reply to posts in their project challenge forums.
13. Company can see the new replies/new posts from students on their project challenge forums.
14. Company can view proposals in either summary view or table view if the project challenge is in approving stage, and select outstanding proposals and list on the Popular Proposals page for other students to learn from.
15. Company can give rating, note and shortlist proposals for project challenge in approving stage.
16. Company can sort proposals by rating, hide selected columns(any combinations from title, author, description, rating, status, my note) in table view when viewing the proposals under the project challenge in approving stage.
17. Company can enter the selection mode to shortlist multiple proposals at a time under a project challenge in approving stage.
18. Company can confirm the shortlisted proposals are correct by the clicking the final confirm button.
19. Company can see students' Outstanding Proposals, sort them by the number of likes/submission date and search by keyword.

### For Student User

1. Student can fill email, username, password to register an account on Ability Plus.
2. Student can browse project challenges created by all the companies and filter project challenges by challenge status(all, open for proposal, approving, open for solution, closed), order by submission date, order by solution deadline/proposal deadline/last modified time and search by keyword to find the ones they want to participate and submit proposals.
3. Student can submit proposals by filling the proposal title, description, problems to solve section, vision statement, general goals and the details of the proposals to any project challenges that is in Open for proposal status.
4. Student can save incomplete proposals to draft and edit them later or deleted from draft when needed.
5. Student can preview the proposal that he/she wants to submit after filling the required information.
6. Student can view their own proposals and filter them by proposal status(all, draft, submitted, approving, approved, rejected), order by submission date, sort by solution deadline/proposal deadline/last modified time and search by keyword to find they ones they are looking for in the shortest amount of time.
7. Student can see all the companies registered on Ability Plus and find the project challenges they created.
8. Student can follow any companies registered on Ability Plus to keep track of their future project challenges.
9. Student can unfollow any companies he/she followed.
10. Student view a list of the companies he/she follows.
11. Student can view the detail of the project challenges if they are on open for proposal, approving status.
12. Student can see the ranking of the project challenges after company selected outstanding proposals for a project challenge.
13. Student can click on company's name to see the profile and the summary of each project the company created.
14. Student can access the forum of the project challenge to ask company questions and reply to company under their posts.
15. Student can delete his/her posts or replies to any posts when needed.
16. Student can edit his/her profile including name, contact email, age and description.
17. Student can change the password of his/her account.
18. Student can see Outstanding Proposals selected from company' project challenges, sort them by the number of likes/submission date, search by keyword and learn from them.
19. Student can like/unlike proposals from the proposals that selected as outstanding from project challenges.


## System Architecture

<img width="1457" alt="image" src="https://user-images.githubusercontent.com/31226246/189354861-d4b0ee44-fd8d-4791-8308-25e64ccdc323.png">


## Local Deployment

[Please view this local deployment instruction.](ready-to-deploy/deployment-instruction.md)


## Backend

Click to view [the repo of the backend](https://github.com/susu1101/Ability-Plus)

Click to view [the api document](http://ability-plus.site:8080/swagger-ui.html)


## File Structure

Within the download you'll find the following directories and files:

```
comp9323-glhf-frontend
    ├── public
    ├── src
    │   ├── assets
    │   ├── auth
    │   ├── context
    │   ├── hooks
    │   ├── components
    │   ├── utils
    │   ├── glhfComponents
    │   │   ├── AlertModal
    │   │   ├── CardCounter
    │   │   ├── DateSearchFilter
    │   │   ├── EndlessScroll
    │   │   ├── LikeButton
    │   │   ├── LikeDateSearchFilter
    │   │   ├── ProcessStatusBadge
    │   │   ├── ProjectDetailBtn
    │   │   ├── ProposalCard
    │   │   ├── ProposalDescriptionModal
    │   │   ├── ProposalRank
    │   │   ├── ProposalsTableView
    │   │   ├── RequestCard
    │   │   ├── RequestCard-Backup
    │   │   ├── RequestDescriptionModal
    │   │   ├── RequestFilter
    │   │   ├── RichTextEditor
    │   │   ├── SavingLoader
    │   │   ├── SelectProposalsFilter
    │   │   ├── StatusBadge
    │   │   ├── StatusDateDueSearchFilter
    │   │   └── StatusProposalSolutionFilter
    │   ├── pages
    │   │   ├── BrowseRequests
    │   │   ├── CompanyInfo
    │   │   ├── CompanyList
    │   │   ├── CreateProposal
    │   │   ├── CreateRequest
    │   │   ├── Forum
    │   │   ├── LandingPages
    │   │   ├── Logout
    │   │   ├── MyPosts
    │   │   ├── MyProjectRequests
    │   │   ├── MyProposals
    │   │   ├── NotFound
    │   │   ├── PopularProposals
    │   │   ├── Presentation
    │   │   ├── ProjectProposals
    │   │   ├── ProposalRanks
    │   │   ├── StudentFollowing
    │   │   ├── StudentInfo
    │   │   └── Unauthorized
    │   ├── examples
    │   ├── layouts
    │   ├── pages
    │   ├── App.js
    │   ├── index.js
    │   ├── footer.routes.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── package.json
    └── README.md
```

Most of the work of the team is located in the following directory/files
```
src
├── assets
├── auth
├── context
├── hooks
├── components
├── utils
├── glhfComponents
├── pages
├── App.js
├── footer.routes.js
└── routes.js
```

## References

The frontend of this project is built using free UI kit [Material Kit 2](https://github.com/creativetimofficial/material-kit-react)

Version: 2.0.0

Accessed Date: 29 Jun 2022

## Technical Support or Questions

If you have questions or need help running the app please contact [Katrina Ding](mailto:z5211336@ad.unsw.edu.au).
