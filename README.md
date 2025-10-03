This project is created using next

# E-commerce website using Next.JS & Typescript (second project using this stack) - [project](https://github.com/amineelamrani/E-Commerce-MERN) previously built using MERN stack and now to use Nextjs & TS and see the improvement in performance and SEO.

- Stack/techs : NextJS, TypeScript, Stripe, MongoDB/Mongoose, Nodemailer, External mail provider, JWT Auth, TailwindCSS, shadcn/Radix-ui.

## Start Date : 13/09/2025

## End Date : 02/10/2025

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
  - sign-up
  - forgot-password (and reset)
  - admin (admin panel to add product, view products and see and update orders status)

- About caching and rendering:

  - Use ISR with revalidate (revalidateTag when you modify product or add new product) for products list, description and titles
  - Use client side render when you need to fetch for comments and reviews/ratings
  - For rating that shows on the home page I am confused does it have to be server rendered or needs to be ISR so it revalidates after we checking the integrity of the reviews and also we can add a revalidateTag to trigger a regeneration when someone added a feedback or the status changed to delivered and paid successfully
    - But this would be not scalable as in the case where we will have a lot of new reviews then we rerender the home page everytime, so split the things that need to be ISRed and the rating will be server generated but for the reviews to read them I would queue them from a client component

- Caching and rendering Decision :
  - ISR => Revalidate the Path when create/update a product by the admin (either go with revalidatePath or revalidateTag -> Because we will have to regenerate products pages) [we wont have rating on the home page]
  - Average rating and Number of reviews in the product page would be client sided : (because I dont want reviews to be SEO indexed so thats normal and I dont want to have a big response time so it will be loaded after having all the product infos - IF I use reviews to be server side rendered then I would have a large HTMLs and might have big response time because the server will do another request to the database to fetch all the reviews which could be ressources extensive)
