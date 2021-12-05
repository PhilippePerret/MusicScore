#!/usr/bin/env ruby
# encoding: UTF-8

def log
  
end
# File.open('./test', 'wb'){|f|f.write("Coucou Marion !")}

begin
  # `echo "eliesalome" | sudo -S gem install tty-prompt`
  # pth = File.join('/Users','philippeperret','ICARE_EDITIONS','xdev','iced','iced.rb')
  pth = '/Users/philippeperret/ICARE_EDITIONS/livres/musique/xDev/music-score-2/music-score.rb'
  curdir = __dir__
  cmd = "ruby #{pth} \"#{curdir}/code.mus\""

  # res = `bash -c ". /Users/philippeperret/.zshrc; shopt -s expand_aliases\nscorize ./code.mus" 2>&1`

  res = `#{cmd} 2>&1`
rescue Exception => e
  res = e.message + "\n" + e.backtrace.join("\n")
end

File.open('./log.txt','wb'){|f|f.puts(res)}
