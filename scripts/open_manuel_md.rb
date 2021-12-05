#!/usr/bin/env ruby
# encoding: UTF-8
# frozen_string_value: true
=begin

Pour ouvrir la version Markdown du manuel

=end

src = File.join('/Users','philippeperret','ICARE_EDITIONS', 'livres', 'musique', 'xDev','music-score-2','Manuel','Manuel.md')

`open -a Typora "#{src}"`

puts "Manuel Markdown ouvert"
