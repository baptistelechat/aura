export interface UnsplashApiResponse {
    status: string;
    images: UnsplashImage[];
}

export interface UnsplashImage {
    id: string;
    slug: string;
    alternative_slugs: Record<string, string>;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string | null;
    alt_description: string | null;
    breadcrumbs: string[];
    urls: UnsplashImageUrls;
    links: UnsplashImageLinks;
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[]; // Dépend de la structure des collections d'utilisateur (non spécifiée ici)
    sponsorship: null | Sponsorship;
    topic_submissions: Record<string, TopicSubmission>;
    asset_type: string;
    user: UnsplashUser;
}

interface UnsplashImageUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
}

interface UnsplashImageLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

interface Sponsorship {
    // Structure supposée pour le Sponsorship, spécifiez ici si plus d'infos sont connues
}

interface TopicSubmission {
    status: string;
    approved_on: string;
}

interface UnsplashUser {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: UnsplashUserLinks;
    profile_image: UnsplashUserProfileImage;
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: UnsplashUserSocial;
}

interface UnsplashUserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
}

interface UnsplashUserProfileImage {
    small: string;
    medium: string;
    large: string;
}

interface UnsplashUserSocial {
    instagram_username: string | null;
    portfolio_url: string | null;
    twitter_username: string | null;
    paypal_email: string | null;
}
