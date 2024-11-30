# photo-advent-calendar

A digital advent calendar you can set up to share your own pictures with friends and family, built as a static client-side-only Vue app.

It supports hosting multiple calendars on different URLs within one deployment.

**[Demo](https://photo-advent-calendar-git-main-maxs-projects-b507fdcd.vercel.app/calendars/demo?allowAll)**

<img width="560" alt="image" src="https://github.com/user-attachments/assets/c5367769-4d2a-45d0-b68f-024e87e479ed">

## Run it yourself

- fork this repository
- modify `src/data/calendars.ts` to provide a slug, title and description.
- upload photos in `src/public/statics/calendars/<slug>`. Their filename should be `1.jpg`, `2.jpg`, etc. It currently expects jpgs but you can modify it in `Calendar.vue`.
- use the url param `showAll` to dispaly all your images without opening them. (Use `allowAll` to allow opening all, without checking whether the day is in the past)

Oneliner for renaming 24 jpg files in a folder to 1.jpg..24.jpg:

```bash
ls *.jpg | python -c "import sys, random; files = sys.stdin.readlines(); random.shuffle(files); print(''.join(['mv {} {}.jpg\n'.format(f.strip(), i+1) for i, f in enumerate(files[:24])]))" | bash
```

**Deploy**

- `npm run build` and host yourself
- or: Just point vercel et al. to your fork

## Development

- `npm install`
- `npm run dev`

## Credits

- Sounds from [Krzysztof Szymanski](https://pixabay.com/users/djartmusic-46653586/)
