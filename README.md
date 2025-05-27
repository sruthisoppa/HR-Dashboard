
#  HR Dashboard

A modern, responsive HR Dashboard built with **Next.js 15**, **React 19**, **Tailwind CSS**, **TypeScript**, and **Chart.js**. It uses client-side authentication by verifying user credentials and manages session state with js-cookie by setting a simple 'authToken'. The dashboard includes interactive data visualizations for HR analytics.


---

##  Live Demo

👉 [Live Demo on Vercel](https://hr-dashboard-eta.vercel.app/)  


---

## 🧰 Tech Stack

- **Framework:** Next.js 15  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS, PostCSS  
- **Authentication:** 'authToken' session management  
- **State & Cookies:** js-cookie, cookie  
- **Charts:** Chart.js, react-chartjs-2  
- **Hosting:** Vercel  


---
## 🖼 Preview 

<p align="center">
  <img src="https://ik.imagekit.io/jxtjn4hpqj/Screenshot%202025-05-26%20123221.png?updatedAt=1748243097448" alt="Start Page" width="300"/>
  &nbsp;&nbsp;
  <img src="https://ik.imagekit.io/jxtjn4hpqj/Screenshot%202025-05-26%20124720.png?updatedAt=1748243950231" alt="Login" width="300"/>
  &nbsp;&nbsp;
  <img src="https://ik.imagekit.io/jxtjn4hpqj/Screenshot%202025-05-26%20123706.png?updatedAt=1748243266452" alt="Dashboard" width="300"/>
  &nbsp;&nbsp;
  <img src="https://ik.imagekit.io/jxtjn4hpqj/Screenshot%202025-05-26%20124747.png?updatedAt=1748243949086" alt="Employee" width="300"/>
  &nbsp;&nbsp;
  <img src="https://ik.imagekit.io/jxtjn4hpqj/Screenshot%202025-05-26%20124804.png?updatedAt=1748243949502" alt="Bookmarks" width="300"/>
  &nbsp;&nbsp;
  <img src="https://ik.imagekit.io/jxtjn4hpqj/Screenshot%202025-05-26%20124755.png?updatedAt=1748243949006" alt="Analytics" width="300"/>
    &nbsp;&nbsp;
  <img src="https://ik.imagekit.io/jxtjn4hpqj/Screenshot%202025-05-26%20124814.png?updatedAt=1748243949345" alt="Dark Mode" width="300"/>
</p>

---
## 💻 Getting Started

This is a **Next.js project bootstrapped with `create-next-app`**.

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will auto-update as you edit files.

Start editing from:
`app/page.tsx`

This project uses `next/font` to automatically optimize and load **Geist**, a modern font by Vercel.

---

## 🧩 Deployment on Vercel

This project is seamlessly deployed with [Vercel](https://vercel.com/).

### Steps:

1. Push code to your GitHub repo
2. Import it on [vercel.com](https://vercel.com/)
3. Add environment variables
4. Vercel handles the build and deploy process

#### Required Environment Variables

| Variable               | Description                   | Example                     |
| ---------------------- | ----------------------------- | --------------------------- |
| `NEXTAUTH_SECRET`      | Secret for session encryption | `your_secret`               |
| `NEXTAUTH_URL`         | App URL (production domain)   | `https://yourdomain.com`    |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID        | `your_google_client_id`     |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret    | `your_google_client_secret` |

---

## 🌐 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/sruthisoppa/HR-Dashboard.git
cd HR-Dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env.local` file:

```env
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Start the app

```bash
npm run dev
```

---

## 📁 Project Structure

```plaintext
.
├── app/              # App directory structure (Next.js 13+ - routing, layout, pages)
├── components/       # Reusable UI components
├── analytics/        # Analytics dashboard and related components
├── contexts/         # React context providers for global state management
├── public/           # Static assets (images, icons, etc.)
├── node_modules/     # Project dependencies (auto-generated)
├── login/            # Authentication-related components and logic
├── bookmarks/        # Bookmark management components and pages
├── hrDashboard/      # Core HR Dashboard features and UI
├── middleware.ts     # Route protection and request middleware
```

---

## 🌟 Features

- **User Registration & Authentication**  
  Sign up with local storage, login with session cookies, and protected routes to ensure only authenticated users can access sensitive pages like the dashboard.

- **Secure Route Protection**  
  Middleware enforces access control, redirecting unauthenticated users to login.

- **Employee Profiles & Details**  
  View comprehensive employee information, including personal details, address, contact info, performance ratings, and bio.

- **Feedback System**  
  Submit and view feedback on employee profiles, with local storage to persist feedback entries.

- **Bookmarking**  
  Save favorite employees for quick access through a dedicated bookmarks page.

- **Dynamic Data Fetching & Enhancement**  
  Fetch dummy user data from an API, assign departments and performance ratings dynamically.

- **Filtering & Searching**  
  Filter employees by department, age range, and search by name, email, or department.

- **Tab-Based Profile Sections**  
  Navigate through Overview, Projects, and Feedback tabs for detailed employee insights.

- **Theme Toggling**  
  Switch between dark and light modes for a personalized UI experience.

- **Responsive & Modern UI**  
  Fully responsive layout with Tailwind CSS, background images with overlay effects, animated loaders, and smooth transitions.

- **Navigation & Routing**  
  Seamless navigation across pages with Next.js routing, including back buttons on profiles.

- **Custom Utility Functions**  
  Debounce search input for performance optimization.

---

## 🔧 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Run development server       |
| `npm run build` | Build the app for production |
| `npm start`     | Start production server      |
| `npm run lint`  | Lint the codebase            |

---

## 📘 Learn More

* [Next.js Documentation](https://nextjs.org/docs) – Learn about features & APIs
* [Learn Next.js](https://nextjs.org/learn) – Interactive Next.js tutorial
* [Next.js GitHub](https://github.com/vercel/next.js) – Contribute or give feedback


## 📦 Deploy on Vercel

The easiest way to deploy a Next.js app is with **[Vercel](https://vercel.com/solutions/nextjs)** – from the creators of Next.js.

Read the official [deployment docs here](https://nextjs.org/docs/deployment).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to fork and submit a pull request. 🙌

---

## 📄 License

Licensed under the [MIT License](LICENSE).

```

---

Let me know if you want:
- A downloadable version of this `README.md`
- A version with status badges (e.g. Vercel Deploy, License, Build Passing)
- Screenshots or GIFs of your dashboard included in the readme for a visual preview

Happy coding! 🚀
```
