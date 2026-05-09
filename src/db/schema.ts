import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// ============================================
// Admin Panel Tables
// ============================================

// Categories for Prefabrik Evler (Tek Katlı, Çift Katlı, Çelik Ev)
export const category = pgTable("category", {
  id: text("id").primaryKey(),
  parentId: text("parent_id"),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  nameAr: text("name_ar"),
  slug: text("slug").notNull().unique(),
  title: text("title"),
  titleEn: text("title_en"),
  titleAr: text("title_ar"),
  description: text("description"),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  subtitle: text("subtitle"),
  subtitleEn: text("subtitle_en"),
  subtitleAr: text("subtitle_ar"),
  subdescription: text("subdescription"),
  subdescriptionEn: text("subdescription_en"),
  subdescriptionAr: text("subdescription_ar"),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Products (Prefabrik Evler)
export const product = pgTable(
  "product",
  {
    id: text("id").primaryKey(),
    categoryId: text("category_id").references(() => category.id, {
      onDelete: "set null",
    }),
    name: text("name").notNull(),
    nameEn: text("name_en"),
    nameAr: text("name_ar"),
    slug: text("slug").notNull().unique(),
    area: text("area").notNull(),
    room: text("room").notNull(),
    floor: text("floor").notNull(),
    bath: text("bath").notNull(),
    height: text("height").notNull(),
    price: text("price"),
    oldPrice: text("old_price"),
    description: text("description"),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    metaDescription: text("meta_description"),
    metaDescriptionEn: text("meta_description_en"),
    metaDescriptionAr: text("meta_description_ar"),
    isActive: boolean("is_active").default(true).notNull(),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("product_category_idx").on(table.categoryId)],
);

export const productCategory = pgTable(
  "product_category",
  {
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("product_category_uidx").on(table.productId, table.categoryId),
    index("product_category_product_idx").on(table.productId),
    index("product_category_category_idx").on(table.categoryId),
  ],
);

// Product Images
export const productImage = pgTable(
  "product_image",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: text("alt").notNull(),
    altEn: text("alt_en"),
    altAr: text("alt_ar"),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("product_image_product_idx").on(table.productId)],
);

// Projects (Projelerimiz)
export const project = pgTable("project", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  titleAr: text("title_ar"),
  slug: text("slug").notNull().unique(),
  area: text("area").notNull(),
  room: text("room").notNull(),
  location: text("location").notNull(),
  locationEn: text("location_en"),
  locationAr: text("location_ar"),
  isActive: boolean("is_active").default(true).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Project Images
export const projectImage = pgTable(
  "project_image",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: text("alt").notNull(),
    altEn: text("alt_en"),
    altAr: text("alt_ar"),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("project_image_project_idx").on(table.projectId)],
);

// Blog Posts
export const blogPost = pgTable(
  "blog_post",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull(),
    content: text("content"),
    category: text("category").notNull(),
    productCategoryId: text("product_category_id").references(
      () => category.id,
      {
        onDelete: "set null",
      },
    ),
    imageUrl: text("image_url").notNull(),
    imageAlt: text("image_alt"),
    readTime: integer("read_time").default(1),
    isPublished: boolean("is_published").default(false).notNull(),
    order: integer("order").default(0).notNull(),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("blog_post_product_category_idx").on(table.productCategoryId),
  ],
);

// Contact Form Submissions
export const contactSubmission = pgTable("contact_submission", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  isRead: boolean("is_read").default(false).notNull(),
  isArchived: boolean("is_archived").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Favorites (Featured Products for Homepage)
export const favorite = pgTable(
  "favorite",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("favorite_product_idx").on(table.productId),
    index("favorite_order_idx").on(table.order),
  ],
);

export const buttonClicks = pgTable("button_clicks", {
  id: serial("id").primaryKey(),
  buttonId: text("button_id").notNull(),
  page: text("page").notNull(),
  userAgent: text("user_agent"),
  ip: text("ip"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteVisit = pgTable(
  "site_visit",
  {
    id: serial("id").primaryKey(),
    visitorKey: text("visitor_key").notNull(),
    page: text("page").notNull(),
    bucketStart: timestamp("bucket_start").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("site_visit_visitor_bucket_uidx").on(
      table.visitorKey,
      table.bucketStart,
    ),
    index("site_visit_created_at_idx").on(table.createdAt),
  ],
);

export const contactClick = pgTable(
  "contact_click",
  {
    id: serial("id").primaryKey(),
    buttonId: text("button_id").notNull(),
    visitorKey: text("visitor_key").notNull(),
    page: text("page").notNull(),
    bucketStart: timestamp("bucket_start").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("contact_click_button_visitor_bucket_uidx").on(
      table.buttonId,
      table.visitorKey,
      table.bucketStart,
    ),
    index("contact_click_created_at_idx").on(table.createdAt),
    index("contact_click_button_created_at_idx").on(table.buttonId, table.createdAt),
  ],
);

// ============================================
// Relations for Admin Panel Tables
// ============================================

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
  productCategories: many(productCategory),
}));

export const productRelations = relations(product, ({ one, many }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  categoryLinks: many(productCategory),
  images: many(productImage),
  favorites: many(favorite),
}));

export const productCategoryRelations = relations(productCategory, ({ one }) => ({
  product: one(product, {
    fields: [productCategory.productId],
    references: [product.id],
  }),
  category: one(category, {
    fields: [productCategory.categoryId],
    references: [category.id],
  }),
}));

export const productImageRelations = relations(productImage, ({ one }) => ({
  product: one(product, {
    fields: [productImage.productId],
    references: [product.id],
  }),
}));

export const projectRelations = relations(project, ({ many }) => ({
  images: many(projectImage),
}));

export const projectImageRelations = relations(projectImage, ({ one }) => ({
  project: one(project, {
    fields: [projectImage.projectId],
    references: [project.id],
  }),
}));

export const favoriteRelations = relations(favorite, ({ one }) => ({
  product: one(product, {
    fields: [favorite.productId],
    references: [product.id],
  }),
}));
