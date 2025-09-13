This project is created using next

# E-commerce website using Next.JS & Typescript (second project using this stack) - [project](https://github.com/amineelamrani/E-Commerce-MERN) previously built using MERN stack and now to use Nextjs & TS and see the improvement in performance and SEO.

- Stack/techs : NextJS, TypeScript, Stripe, MongoDB/Mongoose, Nodemailer, External mail provider, JWT Auth, TailwindCSS, Chadcn/Radix-ui.

## Start Date : 13/09/2025

- Routes Map :

  - Home
  - Collection
  - About
  - Contact
  - Cart
  - Product/productID
  - Purchases
  - stripe integration
  - login
  - sign-up (and account confirmation -> Goal do it with a mail provider not your personal account)
  - forgot-password (and reset)
  - admin (admin panel to add product, view products and see and update orders status)

- About caching and rendering:
  - Use ISR with revalidate (revalidateTag when you modify product or add new product) for products list, description and titles
  - Use client side render when you need to fetch for comments and reviews/ratings
  - For rating that shows on the home page I am confused does it have to be server rendered or needs to be ISR so it revalidates after we checking the integrity of the reviews and also we can add a revalidateTag to trigger a regeneration when someone added a feedback or the status changed to delivered and paid successfully
