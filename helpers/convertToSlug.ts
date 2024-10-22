import unidecode from "unidecode"

export const convertToSlug = (text: string): string => {
  //-B1: chuyen ve ko dau va xoa khoang trang dau cuoi
  const unidecodeText = unidecode(text.trim())

  //-B2: chuyen " " --> "-"
  const slug: string = unidecodeText.replace(/\s+/g, "-")

  return slug
}