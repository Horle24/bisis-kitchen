export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  tag: string;
  photo_url: string;
  available: boolean;
  restaurant: string;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_URL || "";

  if (!SHEET_URL) {
    // Return demo menu if no sheet connected yet
    return DEMO_MENU;
  }

  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 30 } });
    const csv = await res.text();
    return parseCSV(csv);
  } catch (e) {
    console.error("Sheet fetch failed:", e);
    return DEMO_MENU;
  }
}

function parseCSV(csv: string): MenuItem[] {
  const lines = csv.trim().split("\n").map(l =>
    l.split(",").map(c => c.replace(/^"|"$/g, "").trim())
  );
  const [header, ...rows] = lines;

  const col = (k: string) =>
    header.findIndex(h =>
      h.toLowerCase().replace(/\s/g, "_") === k.toLowerCase()
    );

  const iId = col("id");
  const iName = col("name");
  const iCat = col("category");
  const iDesc = col("description");
  const iPrice = col("price");
  const iTag = col("tag");
  const iPhoto = col("photo_url");
  const iAvail = col("available");
  const iRest = col("restaurant");

  return rows
    .filter(r => r[iName]?.trim())
    .map((r, i) => ({
      id: r[iId] || `row${i}`,
      name: r[iName] || "",
      category: (r[iCat] || "other").toLowerCase().trim(),
      description: r[iDesc] || "",
      price: parseInt((r[iPrice] || "0").replace(/[^0-9]/g, "")) || 0,
      tag: r[iTag] || "",
      photo_url: r[iPhoto] || "",
      available: (r[iAvail] || "yes").toLowerCase().trim() === "yes",
      restaurant: r[iRest] || "Unknown Restaurant",
    }));
}

const DEMO_MENU: MenuItem[] = [
  { id: "1", name: "Egusi Soup", category: "soups", description: "Rich melon seed soup with assorted meat and authentic spices.", price: 3500, tag: "Signature", photo_url: "", available: true, restaurant: "Mama's Kitchen" },
  { id: "2", name: "Banga Soup", category: "soups", description: "Creamy palm nut soup slow-cooked with dry fish and crayfish.", price: 4000, tag: "Popular", photo_url: "", available: true, restaurant: "Palm Delight" },
  { id: "3", name: "Afang Soup", category: "soups", description: "Prized vegetable soup with afang leaves and assorted seafood.", price: 4500, tag: "Premium", photo_url: "", available: false, restaurant: "Green Leaf Eatery" },
  { id: "4", name: "Jollof Rice", category: "rice", description: "Classic Nigerian party jollof — smoky, rich and deeply flavourful.", price: 2500, tag: "Bestseller", photo_url: "", available: true, restaurant: "Rice Palace" },
  { id: "5", name: "Fried Rice", category: "rice", description: "Nigerian-style fried rice with vegetables, liver and shrimps.", price: 2800, tag: "Popular", photo_url: "", available: true, restaurant: "Mama's Kitchen" },
  { id: "6", name: "Ofada Rice & Stew", category: "rice", description: "Native unpolished rice with spicy green pepper ofada sauce.", price: 3200, tag: "Local Fav", photo_url: "", available: true, restaurant: "Ofada Spot" },
  { id: "7", name: "Suya Platter", category: "grills", description: "Spiced grilled beef skewers with onions, tomatoes and yaji.", price: 3000, tag: "Street Fav", photo_url: "", available: true, restaurant: "Grill Master" },
  { id: "8", name: "Peppered Chicken", category: "grills", description: "Juicy chicken pieces in rich, fiery pepper sauce.", price: 4500, tag: "Spicy", photo_url: "", available: false, restaurant: "Spice Hub" },
  { id: "9", name: "Catfish Pepper Soup", category: "grills", description: "Fresh catfish in a warming aromatic pepper soup broth.", price: 5000, tag: "Premium", photo_url: "", available: true, restaurant: "Seafood Delight" },
  { id: "10", name: "Puff Puff", category: "snacks", description: "Soft golden deep-fried dough balls — the ultimate Nigerian snack.", price: 800, tag: "Snack", photo_url: "", available: true, restaurant: "Snack Corner" },
  { id: "11", name: "Meat Pie", category: "snacks", description: "Flaky pastry filled with seasoned minced meat and potatoes.", price: 700, tag: "Snack", photo_url: "", available: true, restaurant: "Bakery Bliss" },
  { id: "12", name: "Zobo Drink", category: "drinks", description: "Chilled hibiscus drink with ginger and pineapple.", price: 500, tag: "Refreshing", photo_url: "", available: true, restaurant: "Drink Stop" },
  { id: "13", name: "Chapman", category: "drinks", description: "The beloved Nigerian mocktail — fruity, fizzy and refreshing.", price: 800, tag: "Classic", photo_url: "", available: true, restaurant: "Bar Mix" },
];