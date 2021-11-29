\version "2.18.2"

#(set-default-paper-size "a4")

\paper{
  indent=0\mm
  oddFooterMarkup=##f
  oddHeaderMarkup=##f
  bookTitleMarkup = ##f
  scoreTitleMarkup = ##f
}

\layout {
  \context {
    \Score
    
  }
}

\new PianoStaff <<
  \new Staff = "haute" {
    % enforce creation of all contexts at this point of time
    \clef "treble"
    \relative c' {
      \time 3/4
      
      
      \key ees \major
      
       c'8 d ees g, d' f, | \acciaccatura f8 ees d c ees g c | f, ees' d f aes c, | \acciaccatura c8 b a g b d f \break | ees c g c e c | f c g' c, aes' c, | d bes f bes d bes | ees bes f' bes, g' bes, \break | c aes g aes c ees | bes g f g bes ees | aes, g f g aes ees | d ees f d bes aes \break | g bes ees bes g bes | aes ees' bes ees c ees | bes ees c ees des ees | c4 ees aes~ \break | aes f d'~ | d bes g'~ | g8 f ees d c d | << { ees2. } \\ { r8 bes g2 } >> \bar ":|.|:" | g'8 aes bes g bes f | \acciaccatura f8 e d c e g bes | aes f des g e c | bes g aes c f a, \break | bes d f aes! g f | g ees d c b f' | ees d c ees a, g | fis g a fis d a' \break | d g, fis c' bes g | c, fis g a ees c | bes d fis g a, fis' | g4 bes2~\mordent \break | bes8 des e c g' bes, | aes bes c aes f e | f aes b g d' f, | ees f g ees c b \break | c ees fis d a' c, | b d f aes! g b | d f ees c g b | << { c2. } \\ { r8 g ees2 } >> \bar ":|." 
    }
  }
  \new Staff = "basse" {
    \clef bass
    \relative c {
      \time 3/4
      
      
      \key ees \major
       c4 c' g | aes aes, r | aes' f d | g g, r | c c' bes | aes g f | bes, bes' aes | g f ees | aes c f, | g bes ees, | f aes f | bes bes, d | ees ees, des' | c bes aes | g f ees | aes8 ees' aes g f ees | d f bes aes g f | g bes ees des c bes | aes4 bes bes, | ees4. bes'8 ees4 | ees,4 ees' des | c e, c | f bes, c | f, f' ees! | d bes d | ees ees' d | c a c | d d, c | bes a g | ees' d c | d c d | g,8 d' g bes des f,! | e4 c e | f8 g aes4 r | b, g b | c8 d ees4 r | fis, d fis | g d' ees | aes, f g | c4. g'8 c4 
    }
  }
>>


