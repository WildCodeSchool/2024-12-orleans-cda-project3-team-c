export default {
  getTags(description: string): string[] {
    const tags: string[] = [];
    if (/#+[a-zA-Z0-9(_)]{1,}/.test(description)) {
      const regExpIteratorTags = description.matchAll(
        /(#+[a-zA-Z0-9(_)]{1,})/g,
      );

      for (const tag of regExpIteratorTags) {
        tags.push(tag[0]);
      }
    }
    return tags;
  },
};
