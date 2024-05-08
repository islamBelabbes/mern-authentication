const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3500",
  "http://localhost:3000",
  "https://mern-authentication-ashy.vercel.app",
  "https://5p5f1bd5-3000.euw.devtunnels.ms",
];

const corsOptions = {
  credentials: true,
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

module.exports = {
  corsOptions,
};
