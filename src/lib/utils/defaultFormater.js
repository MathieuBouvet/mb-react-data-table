function defaultFormater(data) {
  return data?.toString?.() ?? "";
}

export { defaultFormater };
