import { Song } from './types'

export const songs: Song[] = [
  {
    id: 'i-dreamed-a-dream',
    title: { en: 'I Dreamed a Dream', zh: '我曾有梦' },
    character: { en: 'Fantine', zh: '芳汀' },
    act: 1,
    description: {
      en: "Fantine's devastating lament for the life she once hoped to live, as she faces destitution and despair.",
      zh: '芳汀在陷入贫困与绝望时，对曾经憧憬的生活发出的悲痛哀叹。',
    },
    context: {
      en: 'Fantine has just been fired from the factory, betrayed by her fellow workers, and forced to sell her hair and teeth to pay the Thénardiers for her daughter Cosette\'s keep. Alone on the streets, she reflects on the young woman she once was — full of hope and in love — and the cruel turns that shattered every promise life seemed to offer.',
      zh: '芳汀刚被工厂解雇，遭同事背叛，被迫卖掉头发和牙齿以支付德纳第夫妇抚养女儿珂赛特的费用。独自流落街头的她回忆起年轻时充满希望和爱情的自己，以及命运如何残酷地击碎了生活曾给予她的每一个承诺。',
    },
  },
  {
    id: 'who-am-i',
    title: { en: 'Who Am I?', zh: '我是谁？' },
    character: { en: 'Valjean', zh: '冉阿让' },
    act: 1,
    description: {
      en: "Valjean's moral crisis: reveal his identity to save an innocent man, or protect his new life.",
      zh: '冉阿让的道德危机：暴露身份拯救无辜之人，还是保全自己的新生活。',
    },
    context: {
      en: 'An innocent man has been arrested and mistaken for Jean Valjean, the fugitive. Now a respected mayor and factory owner, Valjean faces an agonising choice: stay silent and let another man be condemned in his place, or reveal his true identity and lose everything he has built. In a single, electrifying moment, he tears up his carefully constructed life to save a stranger.',
      zh: '一个无辜的人被捕并被误认为逃犯冉阿让。如今身为受人尊敬的市长和工厂主，冉阿让面临痛苦的抉择：保持沉默让另一个人代替自己被定罪，还是揭露真实身份、失去一切。在一个震撼人心的瞬间，他撕碎了精心构建的生活，只为拯救一个素不相识的人。',
    },
  },
  {
    id: 'stars',
    title: { en: 'Stars', zh: '星' },
    character: { en: 'Javert', zh: '沙威' },
    act: 1,
    description: {
      en: "Javert's ode to the unchanging order of the heavens, reflecting his rigid devotion to the law.",
      zh: '沙威对永恒星空秩序的颂歌，映照他对法律的刚正不阿。',
    },
    context: {
      en: 'Standing on a Paris rooftop under the night sky, Inspector Javert renews his vow to hunt down Valjean. To him the stars are proof that the universe runs on fixed, unyielding laws — and so must society. The song reveals a man who draws comfort from certainty, unable to imagine a world where mercy might outweigh justice.',
      zh: '沙威站在巴黎的屋顶上，仰望夜空，重新立誓要追捕冉阿让。在他眼中，星辰证明宇宙以固定不变的法则运行——社会也应如此。这首歌展现了一个从确定性中汲取力量的人，他无法想象一个仁慈可能凌驾于正义之上的世界。',
    },
  },
  {
    id: 'master-of-the-house',
    title: { en: 'Master of the House', zh: '酒店主人' },
    character: { en: 'Thénardiers', zh: '德纳第夫妇' },
    act: 1,
    description: {
      en: "The Thénardiers' raucous comic number celebrating their talent for swindling guests at their inn.",
      zh: '德纳第夫妇欢快的喜剧曲目，炫耀他们在客栈坑骗客人的"才华"。',
    },
    context: {
      en: 'In the grimy village inn at Montfermeil, the Thénardiers fleece every traveller who walks through the door — watering the wine, padding the bills, and picking pockets with glee. This bawdy, darkly comic showpiece is the audience\'s introduction to the story\'s most shameless villains, a married couple who treat dishonesty as an art form.',
      zh: '在蒙费梅伊肮脏的乡村客栈里，德纳第夫妇对每位过路客人敲竹杠——兑水掺酒、虚开账单、趁火打劫，乐此不疲。这首粗犷而黑色幽默的表演曲目向观众介绍了故事中最无耻的反派——一对将欺骗视为艺术的夫妻。',
    },
  },
  {
    id: 'do-you-hear-the-people-sing',
    title: { en: 'Do You Hear the People Sing?', zh: '你可听到人民的歌声？' },
    character: { en: 'Enjolras & Company', zh: '安灼拉与众人' },
    act: 1,
    description: {
      en: 'The rousing anthem of revolution as the students rally to build the barricade.',
      zh: '激昂的革命颂歌，学生们集结起来筑起街垒。',
    },
    context: {
      en: 'News of General Lamarque\'s death — the last voice in government who spoke for the poor — ignites the student revolutionaries. Led by the charismatic Enjolras, they pour into the streets of Paris, rallying ordinary citizens to their cause. The song has transcended the musical itself, becoming a real-world anthem of protest and solidarity.',
      zh: '拉马克将军去世的消息——政府中最后一位为穷人发声的人——点燃了学生革命者的怒火。在富有魅力的安灼拉带领下，他们涌上巴黎街头，号召普通市民加入他们的事业。这首歌已超越音乐剧本身，成为现实世界中抗议与团结的标志性颂歌。',
    },
  },
  {
    id: 'in-my-life',
    title: { en: 'In My Life', zh: '在我生命中' },
    character: { en: 'Cosette, Valjean, Marius & Éponine', zh: '珂赛特、冉阿让、马吕斯与爱潘妮' },
    act: 1,
    description: {
      en: "A quartet revealing each character's private longings — Cosette yearns for her past, Valjean fears losing her, Marius is captivated, and Éponine aches in silence.",
      zh: '四重唱揭示每个角色内心的渴望——珂赛特追忆过往，冉阿让害怕失去她，马吕斯为之倾倒，爱潘妮在沉默中心痛。',
    },
    context: {
      en: 'In the garden of their secluded Paris home, Cosette senses secrets in her sheltered life and longs to know the truth. Valjean watches her growing up and dreads the day he must share her with the world. Meanwhile, Marius — having glimpsed Cosette for the first time — is consumed by a love he cannot name, and Éponine, who led him to this garden, realises the boy she loves will never look at her the same way.',
      zh: '在巴黎僻静住所的花园中，珂赛特隐约感到被庇护的生活中藏着秘密，渴望知道真相。冉阿让看着她长大，害怕有一天必须与世界分享她。与此同时，马吕斯——初次瞥见珂赛特——被一种无法言说的爱所吞噬，而带他来到这座花园的爱潘妮意识到，她爱的男孩永远不会以同样的目光看她。',
    },
  },
  {
    id: 'a-heart-full-of-love',
    title: { en: 'A Heart Full of Love', zh: '满心爱意' },
    character: { en: 'Cosette & Marius', zh: '珂赛特与马吕斯' },
    act: 1,
    description: {
      en: "Cosette and Marius's tender first declaration of love, while Éponine listens heartbroken from the shadows.",
      zh: '珂赛特与马吕斯温柔的初次爱情告白，爱潘妮在暗处心碎地聆听。',
    },
    context: {
      en: 'Having finally found each other again, Marius steals into Cosette\'s garden at night. Overwhelmed and shy, the two young lovers confess their feelings in an innocent, breathless duet. But just beyond the garden gate, Éponine stands guard — the very girl who brought Marius here — listening to every word, her own unspoken love dissolving into heartbreak.',
      zh: '终于再次找到彼此后，马吕斯在夜晚潜入珂赛特的花园。两个年轻的恋人既激动又羞怯，在一首纯真而急切的二重唱中倾诉心意。然而就在花园门外，爱潘妮——正是那个把马吕斯带到这里的女孩——站在那里守望，听着每一句话，自己未曾说出口的爱在心碎中消融。',
    },
  },
  {
    id: 'one-day-more',
    title: { en: 'One Day More', zh: '再多一天' },
    character: { en: 'Full Company', zh: '全体演员' },
    act: 1,
    description: {
      en: "The Act 1 finale weaving every character's hopes and fears on the eve of the uprising.",
      zh: '第一幕终曲，在起义前夜交织每个角色的希望与恐惧。',
    },
    context: {
      en: 'On the eve of the barricade, every storyline converges in a towering ensemble finale. Valjean prepares to flee with Cosette, Marius is torn between love and revolution, Éponine mourns what can never be, Javert plots to infiltrate the rebels, and the Thénardiers scheme to profit from the chaos. Their separate melodies weave together into one of musical theatre\'s most celebrated curtain numbers.',
      zh: '在街垒战前夜，所有故事线在一首宏大的合唱终曲中汇聚。冉阿让准备带珂赛特出逃，马吕斯在爱情与革命之间挣扎，爱潘妮哀悼永远不可能实现的感情，沙威密谋渗透叛军，德纳第夫妇盘算着从混乱中牟利。他们各自的旋律交织在一起，汇成音乐剧史上最经典的幕终曲之一。',
    },
  },
  {
    id: 'on-my-own',
    title: { en: 'On My Own', zh: '独自一人' },
    character: { en: 'Éponine', zh: '爱潘妮' },
    act: 2,
    description: {
      en: "Éponine's heartbreaking solo about her unrequited love for Marius, wandering alone through the rain.",
      zh: '爱潘妮独自在雨中徘徊，倾诉对马吕斯无望的爱——令人心碎的独唱。',
    },
    context: {
      en: 'After delivering Marius to Cosette\'s doorstep and hearing their love duet, Éponine wanders the empty streets of Paris in the rain. She conjures an imaginary world where Marius walks beside her and returns her feelings, knowing all the while that it is only a fantasy. The gap between her vivid daydream and her bleak reality makes this one of the most emotionally devastating songs in the show.',
      zh: '在把马吕斯送到珂赛特家门口、听到他们的爱情二重唱后，爱潘妮在雨中游荡于巴黎空旷的街头。她幻想着一个马吕斯走在身边、回应她感情的世界，却始终清楚这不过是幻梦。鲜活的白日梦与冰冷现实之间的落差，使这成为全剧最令人心碎的歌曲之一。',
    },
  },
  {
    id: 'a-little-fall-of-rain',
    title: { en: 'A Little Fall of Rain', zh: '微雨轻落' },
    character: { en: 'Éponine & Marius', zh: '爱潘妮与马吕斯' },
    act: 2,
    description: {
      en: "Éponine's final duet with Marius as she dies in his arms at the barricade.",
      zh: '爱潘妮在街垒上于马吕斯怀中离世时的最后二重唱。',
    },
    context: {
      en: 'Disguised as a boy, Éponine has joined the students at the barricade to be near Marius. When a soldier aims at him, she throws herself in front of the bullet. Mortally wounded and cradled in his arms at last, she finds a bittersweet peace — the rain on her face feels gentle, and for one fleeting moment, she has the closeness she always longed for.',
      zh: '爱潘妮女扮男装来到街垒，只为靠近马吕斯。当一名士兵向他瞄准时，她挺身挡在子弹前。身受致命伤的她终于被他抱在怀中，找到了一丝苦涩的安宁——脸上的雨滴变得温柔，在这转瞬即逝的时刻，她拥有了一直渴望的亲近。',
    },
  },
  {
    id: 'javerts-suicide',
    title: { en: "Javert's Suicide", zh: '沙威的自尽' },
    character: { en: 'Javert', zh: '沙威' },
    act: 2,
    description: {
      en: "Javert's world shatters when Valjean's mercy defies everything he believes — unable to reconcile justice with grace, he throws himself into the Seine.",
      zh: '冉阿让的仁慈击碎了沙威的信仰——无法在律法与恩典之间自处，他纵身跃入塞纳河。',
    },
    context: {
      en: 'Valjean captures Javert at the barricade and is given the chance to execute his lifelong pursuer — but instead cuts his bonds and sets him free. This act of mercy destroys Javert\'s entire worldview: a criminal cannot be good, yet this one undeniably is. Trapped between a law he can no longer enforce and a compassion he cannot accept, Javert stands on the bridge over the Seine and chooses the only escape his rigid mind will allow.',
      zh: '冉阿让在街垒上俘获了沙威，有机会处决这个追捕他一生的人——但他却割断绳索放了他。这一仁慈之举摧毁了沙威的整个世界观：罪犯不可能是善良的，但这个人无可否认地就是。在无法继续执行的法律和无法接受的慈悲之间进退两难，沙威站在塞纳河的桥上，选择了他僵化的思维所允许的唯一出路。',
    },
  },
  {
    id: 'bring-him-home',
    title: { en: 'Bring Him Home', zh: '带他回家' },
    character: { en: 'Valjean', zh: '冉阿让' },
    act: 2,
    description: {
      en: "Valjean's prayer over the sleeping Marius on the eve of the final battle at the barricade.",
      zh: '在最后决战前夜，冉阿让在沉睡的马吕斯身旁的祈祷。',
    },
    context: {
      en: 'Night has fallen over the barricade and the surviving students sleep before the final assault. Valjean, who came to protect the young man his daughter loves, kneels beside Marius and offers a quiet prayer to God. He asks not for his own life — he has lived long enough — but for this boy to be spared, so that Cosette might have the happiness he could never give her himself.',
      zh: '夜幕笼罩街垒，幸存的学生们在最后一次冲锋前沉沉入睡。冉阿让为了保护女儿深爱的年轻人而来到这里，他跪在马吕斯身旁，向上帝低声祈祷。他不是为自己的生命祈求——他已活得够久——而是恳求让这个男孩平安归来，好让珂赛特拥有他自己永远无法给予她的幸福。',
    },
  },
  {
    id: 'empty-chairs-at-empty-tables',
    title: { en: 'Empty Chairs at Empty Tables', zh: '空桌空椅' },
    character: { en: 'Marius', zh: '马吕斯' },
    act: 2,
    description: {
      en: "Marius's grief-stricken lament for his fallen friends, the sole survivor of the barricade.",
      zh: '马吕斯作为街垒唯一的幸存者，为牺牲的朋友们发出的悲恸哀歌。',
    },
    context: {
      en: 'Weeks after the failed uprising, a recovering Marius returns to the empty café where the students once planned their revolution. The chairs where Enjolras, Grantaire, and the others sat are vacant now, and he can almost hear their phantom voices. Wracked with survivor\'s guilt, he asks why he alone was spared — carried unconscious through the sewers by Valjean while everyone else perished at the barricade.',
      zh: '起义失败数周后，逐渐康复的马吕斯回到学生们曾经策划革命的空荡荡的咖啡馆。安灼拉、格朗泰尔和其他人曾坐过的椅子如今空无一人，他几乎能听到他们幽灵般的声音。被幸存者的愧疚折磨着，他追问为何只有自己被留下——在所有人都在街垒上牺牲时，他被冉阿让背着穿过下水道、在昏迷中获救。',
    },
  },
]
