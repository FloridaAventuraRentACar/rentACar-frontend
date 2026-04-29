const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

export function getMultipleSelectStyles(location, selectedLocations, theme) {
  return {
    fontWeight: selectedLocations.includes(location)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}