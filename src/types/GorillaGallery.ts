export interface IGallery {
  name: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  url: string;
  id: number
}

export interface IGalleryAttribute {
  trait_type: string;
  value: string;
}
