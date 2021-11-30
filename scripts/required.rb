# encoding: UTF-8
require 'json'

def log(msg)
  reflog.puts(Time.new.strftime("%d %m %Y - %H:%M:%S --- ") + msg)
end

def output_long_text(code)
  code.split(/\r?\n/).collect{|s|s.strip}.to_json
end


# - private -

def reflog
  @reflog ||= begin
    File.open(log_path,'a')
  end
end
def log_path
  @log_path ||= File.join(__dir__, 'journal.log')
end
