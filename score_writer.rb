#!/usr/bin/env ruby
# encoding: UTF-8
=begin

  Script maitre de l'application ScoreWriter

=end
require_relative 'lib/required'

begin
  # driver.browser.on_log_event(:saver) { |data| data = data }
  # driver.on(:mutation) { |mutation| mutations.push(mutation) }
  WAA.goto File.join(__dir__,'main.html')
  WAA.run
  # On passe ici quand on en a fini
  puts "On en a fini. À la prochaine avec ScoreWriter !"
rescue Exception => e
  puts e.message + "\n" + e.backtrace.join("\n")
ensure
  WAA.driver.quit
end
