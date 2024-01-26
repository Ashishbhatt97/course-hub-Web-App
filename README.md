# course-hub-Web-App

### Setup

1. Clone the repo
   
   ```sh
   git clone https://github.com/Ashishbhatt97/course-hub-Web-App.git
   ```

### Setting up Project In Local Machine

2. Go to the project's client folder

   ```sh
   cd course-selling-mern
   ```
3. Install packages
   
    -  with yarn

   ```sh
   yarn
   ```
   -  with npm
   
   ```sh
   npm install
   ```

### Setting up All environment variables

1. Set up your `.env` file
  -  Change name `.env.example` to `.env`
  -  Create Your Own `JWT_SECRET_KEY=` Key
  -  Setup MongoDB server and paste the backend string in `DATABASE_URL =`
  -  Setup Localhost URL `NEXT_BASE_URL =`
  -  Signup Stripe Account and paste here Stripe's API Publishable key in `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =`
  -  Setup Stripe and Paste here Stripe's API Publishable key in `STRIPE_SECRET_KEY`

2. Now Run the Project using Command:
   
     ```sh
   npm run dev
   ```
