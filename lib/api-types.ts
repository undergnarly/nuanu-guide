export interface IEvent {
  id: number;
  title: string;
  description: string;
  full_description?: string;
  image: string;
  category: string;
  date: string;
  time: string;
  location?: string;
  capacity?: number;
  registered_count?: number;
  price: string;
  rating: number;
  reviews_count: number;
  author: {
    id: number;
    username: string;
    avatar?: string;
    rating: number;
  };
  is_liked: boolean;
  is_bookmarked: boolean;
}

export interface ICategory {
  id: string;
  label: string;
  slug: string;
}

export interface IReview {
  id: number;
  author: {
    id: number;
    username: string;
    avatar?: string;
  };
  rating: number;
  text: string;
  created_at: string;
}

export interface IEventDetails extends IEvent {
  reviews: IReview[];
} 