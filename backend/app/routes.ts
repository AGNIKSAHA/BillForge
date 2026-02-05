import { Router } from "express";


import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import clientRoutes from "./modules/client/client.routes.js";
import projectRoutes from "./modules/project/project.routes.js";
import timelogRoutes from "./modules/timelog/timelog.routes.js";
import invoiceRoutes from "./modules/invoice/invoice.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";


const router: Router = Router();


router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running"
  });
});


router.use("/auth", authRoutes);


router.use("/users", userRoutes);




router.use("/clients", clientRoutes);

router.use("/projects", projectRoutes);

router.use("/timelog", timelogRoutes);

router.use("/invoices", invoiceRoutes);


router.use("/notifications", notificationRoutes);

export default router;
