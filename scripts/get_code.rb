# encoding: UTF-8
# frozen_string_value: true
=begin

  Script qui permet (au chargement principalement), de retourner
  le code actuel à traiter.

=end
require_relative 'required'
fpath = File.expand_path(File.join(__dir__,'..','score_building','code.mus'))
fpath_image_name = File.expand_path(File.join(__dir__,'..','score_building','image_name'))
if File.exist?(fpath)
  txt = File.read(fpath)
  if File.exist?(fpath_image_name)
    txt = txt.split(/\r?\n/).collect{|s|s.strip}
    if txt[0].start_with?('->')
      txt.shift
    end
    txt = "-> #{File.read(fpath_image_name)}\n#{txt.join("\n")}"
  end
  STDOUT.write output_long_text(txt)
else
  STDOUT.write "null"
end
