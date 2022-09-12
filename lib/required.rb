# encoding: UTF-8
require 'fileutils'
require 'yaml'

# Dossier de l'application
APP_FOLDER = File.dirname(__dir__)

# Dossier dans lequel a été lancé l'application
CURRENT_FOLDER = File.expand_path('.')
# puts "CURRENT_FOLDER: #{CURRENT_FOLDER}"

SCORE_SUITE_FOLDER = File.join(Dir.home, 'Programmes','ScoreSuite')


Dir["#{__dir__}/common/*.rb"].each{|m| require m}

require_relative 'CommandLine'
require_relative 'App'
require_relative 'MusScore'

