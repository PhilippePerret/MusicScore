# encoding: UTF-8

def log(msg)
  reflog.puts(Time.new.strftime("%d %m %Y - %H:%M:%S --- ") + msg)
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
