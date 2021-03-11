const str = `The trees overhead made a great sound of letting down their dry rain. The girl stopped and looked as if she might pull back in surprise, but instead stood regarding Montag with eyes so dark and shining and alive, that he felt he had said something quite wonderful. But he knew his mouth had only moved to say hello, and then when she seemed hypnotized by the salamander on his arm and the phoenix-disc on his chest, he spoke again.
'Of course,' he said, 'you're a new neighbour, aren't you?' 
'And you must be' - she raised her eyes from his professional symbols - 'the fireman.'
Her voice trailed off.
'How oddly you say that.'
'I'd-I'd have known it with my eyes shut,' she said, slowly.
'What-the smell of kerosene? My wife always complains,' he laughed.
'You never wash it off completely.'
'No, you don't,' she said, in awe.
He felt she was walking in a circle about him, turning him end
for end, shaking him quietly, and emptying his pockets, without once moving herself.
'Kerosene,' he said, because the silence had lengthened, 'is nothing but perfume to me.'
'Does it seem like that, really?'
'Of course. Why not?'
She gave herself time to think of it.
'I don't know.'
She turned to face the sidewalk going toward their homes.
'Do you mind if I walk back with you? I'm Clarisse McClellan.'
'Clarisse. Guy Montag. Come along. What are you doing out so late wandering around? How old are you?'
They walked in the warm - cool blowing night on the silvered pavement and there was the faintest breath of fresh apricots and strawberries in the air, and he looked around and realized this was quite impossible, so late in the year.
There was only the girl walking with him now, her face bright as snow in the moonlight, and he knew she was working his questions around, seeking the best answers she could possibly give.
'Well,' she said, 'I'm seventeen and I'm crazy. My uncle says the two always go together. When people ask your age, he said, always say seventeen and insane. Isn't this a nice time of night to
walk ? I like to smell things and look at things, and sometimes stay up all night, walking, and watch the sun rise.
'
They walked on again in silence and
finally she said, thoughtfully, 'You know, I'm not afraid of you at all.'
He was surprised.
'Why should you be?'
'So many people are. Afraid of firemen, I mean. But you're just a man, after all...'
He saw himself in her eyes, suspended in two shining drops of bright water, himself dark and tiny, in fine detail, the lines about his mouth, everything there, as
if her eyes were two miraculous bits of violet amber that might capture and hold him intact.Her face, turned to him now, was fragile milk crystal with a soft and constant light in it.It was not the hysterical light of electricity but - what ? But the strangely comfortable and rare and gently flattering light of the candle.One time, when he was a child, in a power - failure, his mother had found and lit a last candle and there had been a brief hour of rediscovery, of such illumination that space lost its vast dimensions and drew comfortably around them, and they, mother and son, alone, transformed, hoping that the power might not come on again too soon....
And then Clarisse McClellan said:
'Do you mind if I ask? How long have you worked at being a fireman?'
'Since I was twenty, ten years ago.'
'Do you ever read any of the books you bum?' He laughed.
'That's against the law!'
'Oh. Of course.'
'It's fine work. Monday bum Millay, Wednesday Whitman, Friday Faulkner, burn 'em to ashes, then bum the ashes. That's our official slogan.'
They walked still further and the girl said, 'Is it true that long ago firemen put fires out instead of going to start them?'
'No. Houses. have always been fireproof, take my word for it.'
'Strange. I heard once that a long time ago houses used to burn by accident and they needed firemen to stop the flames.'
He laughed.
She glanced quickly over.
'Why are you laughing?'
'I don't know.'
He started to laugh again and stopped 'Why?'
'You laugh when I haven't been funny and you answer right off. You never stop to think what I've asked you.'
He stopped walking, 'You are an odd one,'
he said, looking at her.
'Haven't you any respect?'
'I don't mean to be insulting. It's just, I love to watch people too much, I guess.'
'Well, doesn't this mean anything to you?'
He tapped the numerals 451 stitched on his char - coloured sleeve.
'Yes,' she whispered.She increased her pace.
'Have you ever watched the jet cars racing on the boulevards down that way?
'You're changing the subject!'
'I sometimes think drivers don't know what grass is, or flowers, because they never see them slowly,'
she said.
'If you showed a driver a green blur, Oh yes! he'd say, that's grass! A pink blur? That's a rose-garden! White blurs are houses. Brown blurs are cows. My uncle drove slowly on a highway once. He drove forty miles an hour and they jailed him for two days. Isn't that funny, and sad, too?'
'You think too many things,' said Montag, uneasily.`;
const regexp = /\'(.+?[,.?;:!-])\'/gi;
str.match(regexp);
const str1 = str.replace(regexp, '"\$1\"');
console.log(str1);


const regexpName = new RegExp('([a-zа-я ]+?)', 'gi');
const regexpTel = /(^\+7\(\d{3}\)\d{3}-\d{4}$)/;
const regexMail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
//метод проверки имени
(document.getElementById("your-name").value).match(regexpName).length === document.getElementById("your-name").value.length;
//метод проверки телефона
regexpTel.test(document.getElementById("your-tel").value);
//метод проверки почты
regexMail.test(document.getElementById("your-email").value);