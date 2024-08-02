import { Tag } from "@/lib/types";
import { db } from "..";
import { generateSlug } from "@/lib/utils";
import { tag } from "../schema/auth";
import { createBulkTags } from "../queries/query";

export const capitalizeFirstWord = (str : string) => {
     return str
       .toLowerCase()
       .split(" ")
       .map((word) => {
         return word.charAt(0).toUpperCase() + word.slice(1);
       })
       .join(" ");
}

const tagList = [
  "ANIMAL HUSBANDRY AND VET. SCIENCE P1",
  "ANIMAL HUSBANDRY AND VET. SCIENCE P2",
  "BOTANY P1",
  "BOTANY P2",
  "CHEMISTRY P1",
  "CHEMISTRY P2",
  "CIVIL ENG. P1",
  "CIVIL ENG. P2",
  "COMMERCE AND ACCOUNTANCY P1",
  "COMMERCE AND ACCOUNTANCY P2",
  "ECONOMICS P1",
  "ECONOMICS P2",
  "ELECTRICAL ENG. P1",
  "ELECTRICAL ENG. P2",
  "GEOGRAPHY P1",
  "GEOGRAPHY P2",
  "GEOLOGY P1",
  "GEOLOGY P2",
  "HISTORY P1",
  "HISTORY P2",
  "LAW P1",
  "LAW P2",
  "ASSAMESE P1",
  "ASSAMESE P2",
  "BENGALI P1",
  "BENGALI P2",
  "BODO P1",
  "BODO P2",
  "DOGRI P1",
  "DOGRI P2",
  "ENGLISH P1",
  "ENGLISH P2",
  "GUJARATI P1",
  "GUJARATI P2",
  "HINDI P1",
  "HINDI P2",
  "KANNADA P1",
  "KANNADA P2",
  "KASHMIRI P1",
  "KASHMIRI P2",
  "KONKANI P1",
  "KONKANI P2",
  "MAITHILI P1",
  "MAITHILI P2",
  "MALAYALAM P1",
  "MALAYALAM P2",
  "MARATHI P1",
  "MARATHI P2",
  "MANIPURI P1",
  "MANIPURI P2",
  "NEPALI P1",
  "NEPALI P2",
  "ORIYA P1",
  "ORIYA P2",
  "PUNJABI P1",
  "PUNJABI P2",
  "SANSKRIT P1",
  "SANSKRIT P2",
  "SANTHALI P1",
  "SANTHALI P2",
  "SINDHI P1",
  "SINDHI P2",
  "TAMIL P1",
  "TAMIL P2",
  "TELEGU P1",
  "TELEGU P2",
  "URDU P1",
  "URDU P2",
  "MANAGEMENT P1",
  "MANAGEMENT P2",
  "MATHEMATICS P1",
  "MATHEMATICS P2",
  "MECHANICAL ENG. P1",
  "MECHANICAL ENG. P2",
  "MEDICAL SCIENCE P1",
  "MEDICAL SCIENCE P2",
  "PHILOSOPHY P1",
  "PHILOSOPHY P2",
  "PHYSICS P1",
  "PHYSICS P2",
  "PSYCHOLOGY P1",
  "PSYCHOLOGY P2",
  "PSIR P1",
  "PSIR P2",
  "PUB AD P1",
  "PUB AD P2",
  "SOCIOLOGY P1",
  "SOCIOLOGY P2",
  "STATISTICS P1",
  "STATISTICS P2",
  "ZOOLOGY P1",
  "ZOOLOGY P2",
];

export const tagObject = tagList.map((tag) => {
  return {
    name: capitalizeFirstWord(tag),
    slug: generateSlug(tag),
  };
})

// export const createTags = async () => {
//   const response = await createBulkTags(tagObject);
// };
// console.log(createTags());

