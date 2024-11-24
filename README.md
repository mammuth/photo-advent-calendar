# photo-advent-calendar

A digital advent calendar you can share with friends and family.

**[Demo](https://photo-advent-calendar-git-main-maxs-projects-b507fdcd.vercel.app/calendars/demo?allowAll)**


To run it yourself
- upload photos/videos in `src/assets/calendars/<slug>`. Their filename should be `1.png`, `2.jpg`, `3.mp4` etc. Most common image types are supported
- modify `calendars.ts` to your slug
- use the url param `showAll` to dispaly all your images without opening them. (Use `allowAll` to allow opening all, without checking whether the day is in the past)

# Run
- `npm install`
- `npm run dev`

# Deploy
- `npm run build` and host yourself
- Or: Just point vercel to your fork of this repo
