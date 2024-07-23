export type ThemeColors = {
    background: string;
    text: string;
    mutedText: string;
    hourlyItemBackground: string;
    cardShadow: string;
    toggleThemeBg: string;
    search: {
      shadow: string;
      shadowFocus: string;
      btnBackground: string;
      btnText: string;
      btnHover: string;
    };
    suggestionList: {
      background: string;
      itemHover: string;
      border: string;
      itemBorderBottom: string;
    };
  };
  
  export type Theme = {
    colors: ThemeColors;
  };