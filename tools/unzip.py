#/usr/bin/python
#coding=utf-8
import os,sys,time
import zipfile

filename = sys.argv[1]  #要解压的文件
filedir = sys.argv[2]  #解压后放入的目录


r = zipfile.is_zipfile(filename)
if r:
    fz = zipfile.ZipFile(filename,'r')
    for name in fz.namelist():
        utf8name = name.decode('GBK')
        pathname = filedir+os.path.dirname(utf8name)
        #print(pathname);
        if not os.path.exists(pathname) and pathname != '':
            os.makedirs(pathname);
        data = fz.read(name);
        if not os.path.exists(filedir+utf8name):
            fo = open(filedir+utf8name,'w')
            fo.write(data)
            fo.close()
    fz.close()
else:
    print('This file is not zip file')
