export interface AppLink {
  name: string,
  icon: string,
  color: string,
  regex: RegExp[]
}

const links: AppLink[] = [
  {
    name: "GitHub",
    icon: "teenyicons:github-solid",
    color: "#1A1A1A",
    regex: [
      /(?:https?:)?\/\/(?:www\.)?github\.com\/([A-z0-9_-]+)\/?/
    ]
  },
  {
    name: "Dev.to",
    icon: "skill-icons:devto-dark",
    color: "#333333",
    regex: []
  },
  {
    name: "Codewars",
    icon: "cib:codewars",
    color: "#8A1A50",
    regex: []
  },
  {
    name: "Twitter",
    icon: "mdi:twitter",
    color: "#43B7E9",
    regex: [
      /(?:https?:)?\/\/(?:[A-z]+\.)?twitter\.com\/@?(?!home|share|privacy|tos)([A-z0-9_]+)\/?/
    ]
  },
  {
    name: "CodePen",
    icon: "ri:codepen-line",
    color: "#302267",
    regex: []
  },
  {
    name: "LinkedIn",
    icon: "mdi:linkedin",
    color: "#2D68FF",
    regex: [
      /(?:https?:)?\/\/(?:[\w]+\.)?linkedin\.com\/in\/([\w\-\_À-ÿ%]+)\/?/
    ]
  },
  {
    name: "GitLab",
    icon: "ri:gitlab-fill",
    color: "#EB4925",
    regex: []
  },
  {
    name: "YouTube",
    icon: "ri:youtube-fill",
    color: "#EE3939",
    regex: [
      /(?:https?:)?\/\/(?:[A-z]+\.)?youtube.com\/channel\/([A-z0-9-\_]+)\/?/,
      /(?:https?:)?\/\/(?:[A-z]+\.)?youtube.com\/user\/([A-z0-9]+)\/?/
    ]
  },
  {
    name: "Hashnode",
    icon: "fa6-brands:hashnode",
    color: "#0330D1",
    regex: []
  },
  {
    name: "Facebook",
    icon: "bi:facebook",
    color: "#2442AC",
    regex: [
      /(?:https?:)?\/\/(?:www\.)?(?:facebook|fb)\.com\/((?![A-z]+\.php)(?!marketplace|gaming|watch|me|messages|help|search|groups)[A-z0-9_\-\.]+)\/?/,
      /(?:https?:)?\/\/(?:www\.)facebook.com\/(?:profile.php\?id=)?([0-9]+)/
    ]
  },
  {
    name: "Stack Overflow",
    icon: "cib:stackoverflow",
    color: "#EC7100",
    regex: [
      /(?:https?:)?\/\/(?:www\.)?stackoverflow\.com\/users\/([0-9]+)\/([A-z0-9-_.]+)\/?/
    ]
  },
  {
    name: "Twitch",
    icon: "mdi:twitch",
    color: "#EE3FC8",
    regex: []
  },
]

export default links