# Grenada_MS_VFW_Website
This is a website for the non-profit government post of Grenada MS. I am making this in hopes of helping the local VFW modernize their approach in gaining members and donations. 

## Developers
- Blair Farrell
- Tyler Farrell

## How it works
- **Website:** React + Vite app in `VFW_Websites/`, hosted on Railway.
- **Database, logins, and photo storage:** [Supabase](https://supabase.com) (free plan is plenty).
- **Donations:** a [Zeffy](https://www.zeffy.com) form embedded on the Donations page. Card details go straight to Zeffy and never touch this site.
- **Admin Dashboard:** go to `/admin` (it isn't linked in the menu). Admins can edit the text, lists, and images on every page, and manage events, photos, and membership applications.

If Supabase isn't connected, the site still works and shows its built-in default text.

## One-time setup

### 1. Create the Supabase project
1. Sign up at [supabase.com](https://supabase.com) and create a new project. Save the database password somewhere safe.
2. Open **SQL Editor -> New query**, paste all of `VFW_Websites/supabase/schema.sql`, and click **Run**.
3. Go to **Authentication -> Sign In / Providers** and turn **off** "Allow new users to sign up". Admin accounts are created by hand (step 4), so nobody else can make an account.
4. Go to **Authentication -> URL Configuration**:
   - **Site URL:** `https://vfwgrenada.org`
   - **Redirect URLs:** add `https://vfwgrenada.org/admin` and `http://localhost:5173/admin`

### 2. Add an admin
1. **Authentication -> Users -> Add user -> Create new user.** Enter the person's email and a strong password (12+ characters), and check **Auto Confirm User**.
2. In the **SQL Editor**, run (with their email):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'person@example.com';
   ```
Only accounts on this admin list can change anything, even if they can sign in.

### 3. Connect the website to Supabase
In Supabase, open **Project Settings -> API** and copy the **Project URL** and the **anon / publishable** key.

- **Railway:** open the website service -> **Variables**, and add:
  - `VITE_SUPABASE_URL` = the Project URL
  - `VITE_SUPABASE_ANON_KEY` = the anon key

  Then redeploy.
- **Local development:** copy `VFW_Websites/.env.example` to `VFW_Websites/.env.local` and fill in the same two values.

> Never use the **service_role / secret** key in the website. It bypasses all security rules.

### 4. Connect Zeffy
1. In Zeffy, create a donation form, click **Share**, and copy the link.
2. In the Admin Dashboard, go to **Pages -> Donations Page**, paste it into **Zeffy donation form link**, and click **Save**.

## Running locally
```sh
cd VFW_Websites
npm install
npm run dev
```
