/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import post1 from "assets/images/NIÑOS/7.jpg";
import post2 from "assets/images/NIÑOS/2.jpg";
import post3 from "assets/images/MUJERES/5.jpg";
import post4 from "assets/images/NIÑAS/2.jpg";
import post5 from "assets/images/NIÑAS/3.jpg";
import post6 from "assets/images/NIÑAS/4.jpg";
import post7 from "assets/images/MUJERES/6.jpg";
import post8 from "assets/images/MUJERES/9.jpg";
import post9 from "assets/images/HOMBRES/5.jpg";
import post10 from "assets/images/HOMBRES/4.jpg";
import post11 from "assets/images/HOMBRES/3.jpg";
import post12 from "assets/images/MUJERES/4.jpg";
import post13 from "assets/images/MUJERES/1.jpg";
import post14 from "assets/images/MUJERES/5.jpg";
import post15 from "assets/images/MUJERES/8.jpg";
import post16 from "assets/images/MUJERES/10.jpg";

const imagesPrefix =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

export default [
  {
    title: "NIÑOS",
    description: "Contamos con diversos servicos para su comodida",
    items: [
      {
        image: post1,
        name: "LAVADO DE CABELLO NIÑOS",
        count: 8000,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: post2,
        name: "CORTE NIÑO",
        count: 18000,
        route: "/sections/page-sections/features",
      },
      /*
      {
        image: `${imagesPrefix}/pricing.jpg`,
        name: "Pricing",
        count: 10,
        pro: true,
      },
      {
        image: `${imagesPrefix}/faq.jpg`,
        name: "FAQ",
        count: 1,
        pro: true,
      },
      {
        image: `${imagesPrefix}/blogs.jpg`,
        name: "Blog Posts",
        count: 11,
        pro: true,
      },
      {
        image: `${imagesPrefix}/testimonials.jpg`,
        name: "Testimonials",
        count: 11,
        pro: true,
      },
      {
        image: `${imagesPrefix}/teams.jpg`,
        name: "Teams",
        count: 6,
        pro: true,
      },
      {
        image: `${imagesPrefix}/stats.jpg`,
        name: "Stats",
        count: 3,
        pro: true,
      },
      {
        image: `${imagesPrefix}/call-to-action.jpg`,
        name: "Call to Actions",
        count: 8,
        pro: true,
      },
      {
        image: `${imagesPrefix}/projects.jpg`,
        name: "Applications",
        count: 6,
        pro: true,
      },
      {
        image: `${imagesPrefix}/logo-area.jpg`,
        name: "Logo Areas",
        count: 4,
        pro: true,
      },
      {
        image: `${imagesPrefix}/footers.jpg`,
        name: "Footers",
        count: 10,
        pro: true,
      },
      {
        image: `${imagesPrefix}/general-cards.jpg`,
        name: "General Cards",
        count: 9,
        pro: true,
      },
      {
        image: `${imagesPrefix}/content-sections.jpg`,
        name: "Content Sections",
        count: 8,
        pro: true,
      },
      */
    ],
  },
  {
    title: "NIÑAS",
    description: "Brindamos un servicio eficiente para que guardes en tu memoria los momentos mas especiales para tu niña",
    items: [
      {
        image: post3,
        name: "LAVADO DE CABELLO NIÑAS",
        count: 8000,
        descripcion: "Los mejores productos del barrio ",
        route: "/sections/navigation/navbars",
      },
      {
        image: post4,
        name: "CORTE NIÑA",
        count: 18000,
        descripcion: "Los mejores productos del barrio ",
        route: "/sections/navigation/nav-tabs",
      },
      {
        image: post5,
        name: "PEINADO NIÑA",
        count: 40000,
        route: "/sections/navigation/pagination",
      },
      {
        image: post6,
        name: "TRENZAS",
        count: 43000,
        route: "/sections/navigation/pagination",
      },
      {
        image: post7,
        name: "MANICURA",
        count: 30000,
        route: "/sections/navigation/pagination",
      },
      {
        image: post8,
        name: "BLOWER (NO INCLUYE LAVADO)",
        count: 50000,
        route: "/sections/navigation/pagination",
      },
    ],
  },
  {
    title: "HOMBRES",
    description: "Tu tambien tienes derecho a sentirte guapo y aqui se brinda todos esos servicios para ti ",
    items: [
      {
        image: post9,
        name: "CORTE DE CABELLO",
        count: 36000,
        pro: true,
      },
      {
        image: post10,
        name: "COLOR PARA EL CABELLO",
        count: 65000,
        pro: true,
      },
      {
        image: post11,
        name: "MASAJE CAPILAR CON AMPOLLETA",
        count: 35000,
        route: "/sections/input-areas/forms",
      },
      /*
      {
        image: `${imagesPrefix}/inputs.jpg`,
        name: "Inputs",
        count: 6,
        route: "/sections/input-areas/inputs",
      },*/
    ],
  },
  {
    title: "MUJERES",
    description: "Es tu momento de brillar y sentirte bella. Te ofrecemos los mejores servicios para ti",
    items: [
      {
        image: post12,
        name: "PEINADOS",
        count: 27000,
        route: "/sections/attention-catchers/alerts",
      },
      {
        image: post13,
        name: "ALISADO DE CABELLO",
        count: 30000,
        pro: true,
      },
      {
        image: post14,
        name: "MASAJE CAPILAR CON AMPOLLETA",
        count: 35000,
        route: "/sections/attention-catchers/tooltips-popovers",
      },
      {
        image: post7,
        name: "MANICURE",
        count: 25000,
        route: "/sections/attention-catchers/modals",
      },
        {
        image: post15,
        name: "PESTAÑAS PELO A PELO",
        count: 45000,
        route: "/sections/attention-catchers/modals",
      },
          {
        image: post8,
        name: "BLOWER (NO INCLUYE LAVADO)",
        count: 50000,
        route: "/sections/attention-catchers/modals",
      },
            {
        image: post16,
        name: "CORTE DE CABELLO",
        count: 36000,
        route: "/sections/attention-catchers/modals",
      },
    ],
  }
];
