import { Link } from 'react-router-dom';

export function getTimeAgo(datetime: Date): string {
  const timing = Date.now() - Date.parse(datetime.toString());
  if (timing >= 31536000000) {
    const years = Math.floor(timing / 31536000000);
    return `${years} day${years > 1 ? 's' : ''} ago`;
  } else if (timing >= 2592000000) {
    const months = Math.floor(timing / 2592000000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (timing >= 604800000) {
    const weeks = Math.floor(timing / 604800000);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (timing >= 86400000) {
    const days = Math.floor(timing / 86400000);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (timing >= 3600000) {
    const hours = Math.floor(timing / 3600000);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (timing >= 60000) {
    const minutes = Math.floor(timing / 60000);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${Math.floor(timing / 1000)} seconds ago`;
  }
}

export function delimiteTags(text: string): string {
  if (/#+[a-zA-Z0-9(_)]{1,}/.test(text)) {
    const tags = text.matchAll(/(#+[a-zA-Z0-9(_)]{1,})/g);
    for (const tag of tags) {
      text = text.replace(tag[0], `||SEPARATOR||${tag[0]}||SEPARATOR||`);
    }
  }
  return text;
}

export function delimiteMentions(text: string): string {
  if (/@+[a-zA-Z0-9(_).-]{1,}/.test(text)) {
    const mentions = text.matchAll(/(@+[a-zA-Z0-9(_).-]{1,})/g);
    for (const mention of mentions) {
      text = text.replace(
        mention[0],
        `||SEPARATOR||${mention[0]}||SEPARATOR||`,
      );
    }
  }
  return text;
}

export function getDescriptionElements(
  description: string,
): React.JSX.Element[] {
  description = delimiteMentions(delimiteTags(description));

  return description.split('||SEPARATOR||').map((element, index) => {
    if (element.startsWith('#')) {
      return (
        <Link
          className='font-title text-turquoise-blue-100 hover:text-turquoise-blue-400'
          to={`/search/tags/${element.slice(1)}`}
          key={`${index}` + element[-1]}
          title={`See posts related to '${element.slice(1)}'`}
        >
          {element}
        </Link>
      );
    } else if (element.startsWith('@')) {
      return (
        <Link
          className='font-title text-turquoise-blue-100 hover:text-turquoise-blue-400'
          to={`/profile/${element.slice(1)}`}
          key={`${index}` + element[-1]}
          title={`See ${element.slice(1)}'s profile`}
        >
          {element}
        </Link>
      );
    } else {
      return <span key={`${index}` + element[-1]}>{element}</span>;
    }
  });
}
