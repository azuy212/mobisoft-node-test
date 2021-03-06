import { Document } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  categories: string[];
  publisher: string;
  thumbnail?: string;
}

export interface IBookDocument extends IBook, Document {}

// Generated by https://quicktype.io

export interface IGoogleBook {
  kind: string;
  totalItems: number;
  items: Item[];
}

interface Item {
  kind: Kind;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

interface AccessInfo {
  country: Country;
  viewability: Viewability;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: TextToSpeechPermission;
  epub: Epub;
  pdf: PDF;
  webReaderLink: string;
  accessViewStatus: AccessViewStatus;
  quoteSharingAllowed: boolean;
}

enum AccessViewStatus {
  None = 'NONE',
  Sample = 'SAMPLE',
}

enum Country {
  Pk = 'PK',
}

interface Epub {
  isAvailable: boolean;
}

interface PDF {
  isAvailable: boolean;
  acsTokenLink?: string;
}

enum TextToSpeechPermission {
  Allowed = 'ALLOWED',
}

enum Viewability {
  NoPages = 'NO_PAGES',
  Partial = 'PARTIAL',
}

enum Kind {
  BooksVolume = 'books#volume',
}

interface SaleInfo {
  country: Country;
  saleability: Saleability;
  isEbook: boolean;
}

enum Saleability {
  NotForSale = 'NOT_FOR_SALE',
}

interface SearchInfo {
  textSnippet: string;
}

interface VolumeInfo {
  title: string;
  publisher?: string;
  publishedDate: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount?: number;
  printType: PrintType;
  maturityRating: MaturityRating;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks: ImageLinks;
  language: Language;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  authors?: string[];
  description?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  subtitle?: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface IndustryIdentifier {
  type: Type;
  identifier: string;
}

enum Type {
  Isbn10 = 'ISBN_10',
  Isbn13 = 'ISBN_13',
}

enum Language {
  En = 'en',
}

enum MaturityRating {
  NotMature = 'NOT_MATURE',
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

enum PrintType {
  Book = 'BOOK',
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}
