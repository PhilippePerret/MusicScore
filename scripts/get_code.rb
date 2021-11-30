# encoding: UTF-8
# frozen_string_value: true
=begin

  Script qui permet (au chargement principalement), de retourner
  le code actuel à traiter.

=end
require_relative 'required'
fpath = File.expand_path(File.join(__dir__,'..','score_building','code.mus'))
if File.exist?(fpath)
  STDOUT.write output_long_text(File.read(fpath))
else
  STDOUT.write "null"
end
