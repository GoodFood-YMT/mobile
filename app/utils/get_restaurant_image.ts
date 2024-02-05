export const getRestaurantImage = (name: string): string => {
  name = name.toLowerCase();

  if (name.includes("donalds") || name.includes("burger")) {
    return "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  if (name.includes("sushi")) {
    return "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  if (name.includes("tacos")) {
    return "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  if (name.includes("kebab")) {
    return "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  if (name.includes("pizza")) {
    return "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
};
