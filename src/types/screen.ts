import { Blog } from "./blog";
import { Product } from "./product";
import { Member, Cafe } from "./user";
import { Like, Order } from "./order";
import { Follower, Following } from "./follow";
import { Review } from "./review";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  cafePage: CafePageState;
  productPage: ProductPageState;
  blogPage: BlogPageState;
  ordersPage: OrdersPageState;
}

/** HOME PAGE */
export interface HomePageState {
  topCafes: Cafe[];
  trendProducts: Product[];
  saleProducts: Product[];
}

/** CAFE PAGE */
export interface CafePageState {
  allCafes: Cafe[];
  chosenCafe: Cafe | null;
  randomCafes: Cafe[];
  cafeProducts: Product[];
}

/** PRODUCT PAGE */
export interface ProductPageState {
  allProducts: Product[];
  chosenProduct: Product | null;
  productReviews: Review[];
}

/** BLOG PAGE */
export interface BlogPageState {
  allBlogs: Blog[];
  chosenMember: Member | null;
  chosenMemberBlogs: Blog[];
  chosenBlog: Blog | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
  blogReviews: Review[];
}

/*ORDERS PAGE*/
export interface OrdersPageState {
  pendingOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
  cancelledOrders: Order[];
  allOrders: Order[];
  wishlist: Like[];
}
