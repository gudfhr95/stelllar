import {
  IconAll,
  IconCategoryArts,
  IconCategoryBusiness,
  IconCategoryCulture,
  IconCategoryDiscussion,
  IconCategoryEntertainment,
  IconCategoryGaming,
  IconCategoryHealth,
  IconCategoryHobbies,
  IconCategoryLifestyle,
  IconCategoryMemes,
  IconCategoryMeta,
  IconCategoryNews,
  IconCategoryOther,
  IconCategoryPolitics,
  IconCategoryProgramming,
  IconCategoryScience,
  IconCategorySports,
  IconCategoryTechnology,
} from "../components/ui/icons/Icons";

export const getCategoryIcon = (category: string | null) => {
  switch (category) {
    case "Arts":
      return IconCategoryArts;
    case "Business":
      return IconCategoryBusiness;
    case "Culture":
      return IconCategoryCulture;
    case "Discussion":
      return IconCategoryDiscussion;
    case "Entertainment":
      return IconCategoryEntertainment;
    case "Gaming":
      return IconCategoryGaming;
    case "Health":
      return IconCategoryHealth;
    case "Hobbies":
      return IconCategoryHobbies;
    case "Lifestyle":
      return IconCategoryLifestyle;
    case "Memes":
      return IconCategoryMemes;
    case "Meta":
      return IconCategoryMeta;
    case "News":
      return IconCategoryNews;
    case "Politics":
      return IconCategoryPolitics;
    case "Programming":
      return IconCategoryProgramming;
    case "Science":
      return IconCategoryScience;
    case "Sports":
      return IconCategorySports;
    case "Technology":
      return IconCategoryTechnology;
    case "Other":
      return IconCategoryOther;
  }

  return IconAll;
};
