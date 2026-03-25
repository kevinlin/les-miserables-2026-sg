import { CastMember } from './types'

export const castMembers: CastMember[] = [
  {
    id: 'lea-salonga',
    name: 'Lea Salonga',
    role: { en: 'Madame Thénardier', zh: '德纳第夫人' },
    bio: {
      en: "Tony and Olivier Award-winning Filipino actress, known worldwide as the singing voice of Disney's Princess Jasmine and Fa Mulan. Lea originated the role of Kim in Miss Saigon on the West End and Broadway, and has played Éponine (Broadway 1992, 10th anniversary concert) and Fantine (25th anniversary O2 concert) in Les Misérables. Her casting as Madame Thénardier in this Singapore run makes her the only performer to have played all three principal female roles across separate productions.",
      zh: '菲律宾裔托尼奖及奥利弗奖双料得主，以迪士尼茉莉公主与花木兰的歌声闻名世界。她在《西贡小姐》中首演Kim一角，曾在《悲惨世界》中饰演爱潘妮（1992年百老汇、十周年音乐会）及芳汀（25周年O2音乐会）。此次在新加坡出演德纳第夫人，使她成为唯一在不同制作中饰演过三位女主角的演员。',
    },
    whySpecial: {
      en: 'The only performer ever to play Éponine, Fantine, and Madame Thénardier — all three principal female roles — across separate Les Misérables productions. A historic "Triple Crown."',
      zh: '史上唯一在不同《悲惨世界》制作中分别饰演爱潘妮、芳汀和德纳第夫人三位女主角的演员——历史性的"三冠王"。',
    },
    songs: ['master-of-the-house', 'one-day-more'],
    photoUrl: '/images/cast/lea-salonga.jpg',
    tags: ['featured', 'celebrity'],
    awards: ['Tony Award', 'Olivier Award'],
  },
  {
    id: 'nathania-ong',
    name: 'Nathania Ong',
    role: { en: 'Éponine', zh: '爱潘妮' },
    bio: {
      en: "Singapore-born musical theatre actress and the first Singaporean to play Éponine in the West End. Nathania's credits include Eliza in Hamilton (West End) and the Les Misérables UK and Ireland tour. This Singapore run marks the first time she performs the role in her home country.",
      zh: '新加坡出生的音乐剧演员，首位在伦敦西区饰演爱潘妮的新加坡人。曾在西区《汉密尔顿》中饰演Eliza，并参演《悲惨世界》英国及爱尔兰巡演。此次新加坡演出是她首次在家乡演出这一角色。',
    },
    whySpecial: {
      en: 'The first Singaporean to play Éponine in the West End, now performing the role for the first time in her home country. A true homecoming.',
      zh: '首位在伦敦西区饰演爱潘妮的新加坡人，如今首次在家乡演出这一角色——真正的衣锦还乡。',
    },
    songs: ['on-my-own', 'a-little-fall-of-rain', 'one-day-more'],
    photoUrl: '/images/cast/nathania-ong.jpg',
    tags: ['featured', 'local'],
  },
  {
    id: 'geronimo-rauch',
    name: 'Gerónimo Rauch',
    role: { en: 'Jean Valjean', zh: '冉阿让' },
    bio: {
      en: 'Argentine musical theatre star who has played Jean Valjean in the West End, on Broadway, and in multiple international productions. Acclaimed for his powerful tenor voice and emotional depth in the role.',
      zh: '阿根廷音乐剧明星，曾在伦敦西区、百老汇及多个国际制作中饰演冉阿让。以强大的男高音和深厚的情感表现著称。',
    },
    whySpecial: null,
    songs: ['who-am-i', 'bring-him-home', 'one-day-more'],
    photoUrl: '/images/cast/geronimo-rauch.jpg',
    tags: [],
  },
  {
    id: 'jeremy-secomb',
    name: 'Jeremy Secomb',
    role: { en: 'Javert', zh: '沙威' },
    bio: {
      en: 'Australian actor and singer who has played Javert in multiple productions of Les Misérables worldwide, including the West End and the Arena Spectacular tour. Known for his commanding stage presence and rich baritone.',
      zh: '澳大利亚演员及歌手，在全球多个《悲惨世界》制作中饰演沙威，包括伦敦西区及Arena Spectacular巡演。以其强大的舞台气场和浑厚的男中音著称。',
    },
    whySpecial: null,
    songs: ['stars', 'one-day-more'],
    photoUrl: '/images/cast/jeremy-secomb.jpg',
    tags: [],
  },
  {
    id: 'na-young-jeon',
    name: 'Na-Young Jeon',
    role: { en: 'Fantine', zh: '芳汀' },
    bio: {
      en: 'South Korean musical theatre actress bringing emotional intensity to the role of Fantine. Known for her powerful soprano voice across Korean and international musical productions.',
      zh: '韩国音乐剧女演员，为芳汀一角注入深沉的情感力量。以其强大的女高音在韩国及国际音乐剧舞台上闻名。',
    },
    whySpecial: null,
    songs: ['i-dreamed-a-dream', 'one-day-more'],
    photoUrl: '/images/cast/na-young-jeon.jpg',
    tags: [],
  },
  {
    id: 'red-concepcion',
    name: 'Red Concepción',
    role: { en: 'Thénardier', zh: '德纳第' },
    bio: {
      en: 'Filipino-British actor known for diverse roles across theatre, television, and film. Brings comic villainy and charisma to the role of the scheming innkeeper Thénardier.',
      zh: '菲律宾裔英国演员，活跃于戏剧、电视和电影领域。为奸诈的客店老板德纳第注入喜剧般的坏蛋魅力。',
    },
    whySpecial: null,
    songs: ['master-of-the-house', 'one-day-more'],
    photoUrl: '/images/cast/red-concepcion.jpg',
    tags: [],
  },
  {
    id: 'will-callan',
    name: 'Will Callan',
    role: { en: 'Marius', zh: '马吕斯' },
    bio: {
      en: 'British musical theatre actor playing the idealistic student revolutionary Marius. Known for his lyrical tenor and youthful energy on stage.',
      zh: '英国音乐剧演员，饰演理想主义的学生革命者马吕斯。以抒情的男高音和青春的舞台活力著称。',
    },
    whySpecial: null,
    songs: ['a-little-fall-of-rain', 'empty-chairs-at-empty-tables', 'one-day-more'],
    photoUrl: '/images/cast/will-callan.jpg',
    tags: [],
  },
  {
    id: 'lulu-mae-pears',
    name: 'Lulu-Mae Pears',
    role: { en: 'Cosette', zh: '珂赛特' },
    bio: {
      en: "British actress bringing warmth and grace to Cosette, Valjean's adopted daughter. Her portrayal captures both the character's innocence and inner strength.",
      zh: '英国女演员，为冉阿让的养女珂赛特注入温暖与优雅。她的演绎兼具角色的纯真与内在的坚强。',
    },
    whySpecial: null,
    songs: ['one-day-more'],
    photoUrl: '/images/cast/lulu-mae-pears.jpg',
    tags: [],
  },
  {
    id: 'harry-chandler',
    name: 'Harry Chandler',
    role: { en: 'Enjolras', zh: '安灼拉' },
    bio: {
      en: 'British musical theatre performer playing the fiery student leader Enjolras. Commands the barricade scenes with vocal power and revolutionary conviction.',
      zh: '英国音乐剧演员，饰演充满激情的学生领袖安灼拉。以强大的歌声和革命信念掌控路障场景。',
    },
    whySpecial: null,
    songs: ['do-you-hear-the-people-sing', 'one-day-more'],
    photoUrl: '/images/cast/harry-chandler.jpg',
    tags: [],
  },
]

export const featuredCast = castMembers.filter((m) => m.tags.includes('featured'))
export const standardCast = castMembers.filter((m) => !m.tags.includes('featured'))
